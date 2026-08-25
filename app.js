
/**
 * PromptCraft — Generador de Prompts para IA
 * Autenticación con Google + lista blanca de usuarios autorizados
 * Carga plantillas dinámicamente desde Firestore
 */

let usuarioActual = null;
let plantillas = [];
let plantillaSeleccionada = null;

const elementos = {};

document.addEventListener('DOMContentLoaded', () => {
    referenciarElementos();
    configurarEventos();
    verificarSesion();
});

function referenciarElementos() {
    elementos.authScreen = document.getElementById('auth-screen');
    elementos.mainApp = document.getElementById('main-app');
    elementos.googleLoginBtn = document.getElementById('google-login-btn');
    elementos.authError = document.getElementById('auth-error');
    elementos.btnLogout = document.getElementById('btn-logout');

    elementos.categoriaSelect = document.getElementById('categoria-select');
    elementos.plantillasList = document.getElementById('plantillas-list');
    elementos.formContainer = document.getElementById('form-container');
    elementos.camposWarning = document.getElementById('campos-warning');
    elementos.btnGenerarPrompt = document.getElementById('btn-generar-prompt');
    elementos.promptPreview = document.getElementById('prompt-preview');

    elementos.btnCopy = document.getElementById('btn-copy-prompt');
    elementos.btnDownload = document.getElementById('btn-download-prompt');
    elementos.btnShare = document.getElementById('btn-share-prompt');
}

// ==================== AUTENTICACIÓN ====================
function mostrarAuth(mostrar) {
    if (mostrar) {
        elementos.authScreen.style.display = 'flex';
        elementos.mainApp.style.display = 'none';
    } else {
        elementos.authScreen.style.display = 'none';
        elementos.mainApp.style.display = 'block';
    }
}

function mostrarErrorAuth(mensaje) {
    elementos.authError.textContent = mensaje;
}

function verificarSesion() {
    if (window.auth && window.auth.currentUser) {
        verificarAutorizacion(window.auth.currentUser);
    } else {
        mostrarAuth(true);
    }

    window.auth?.onAuthStateChanged((user) => {
        if (user) {
            verificarAutorizacion(user);
        } else {
            usuarioActual = null;
            mostrarAuth(true);
        }
    });
}

async function iniciarSesionGoogle() {
    if (!window.auth) {
        mostrarErrorAuth('Firebase Auth no está disponible.');
        return;
    }

    elementos.googleLoginBtn.disabled = true;
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const resultado = await window.auth.signInWithPopup(provider);
        await verificarAutorizacion(resultado.user);
    } catch (error) {
        console.error('Error en autenticación con Google:', error);
        mostrarErrorAuth('No se pudo completar el inicio de sesión.');
    } finally {
        elementos.googleLoginBtn.disabled = false;
    }
}

async function verificarAutorizacion(user) {
    if (!window.db) {
        mostrarErrorAuth('Base de datos no disponible.');
        return;
    }

    try {
        const docRef = window.db.collection('usuarios').doc(user.email.toLowerCase());
        const doc = await docRef.get();

        if (doc.exists && doc.data().activo === true) {
            usuarioActual = user;
            mostrarErrorAuth('');
            mostrarAuth(false);
            await cargarPlantillas();
        } else {
            await window.auth.signOut();
            mostrarAuth(true);
            mostrarErrorAuth('Tu correo no está autorizado para usar PromptCraft.');
        }
    } catch (error) {
        console.error('Error verificando autorización:', error);
        mostrarErrorAuth('No se pudo verificar tu acceso.');
    }
}

async function cerrarSesion() {
    if (window.auth) {
        await window.auth.signOut();
    }
    usuarioActual = null;
    mostrarAuth(true);
}

// ==================== CARGA DE PLANTILLAS ====================
async function cargarPlantillas() {
    if (!window.db) return;

    elementos.plantillasList.innerHTML = '<p class="loading-message">Cargando plantillas...</p>';

    try {
        const snapshot = await window.db.collection('plantillas').orderBy('categoria').get();

        plantillas = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            plantillas.push({
                id: doc.id,
                categoria: data.categoria || 'General',
                titulo: data.titulo || doc.id,
                descripcion: data.descripcion || '',
                icono: data.icono || '📄',
                campos: data.campos || [],
                promptTemplate: data.promptTemplate || ''
            });
        });

        if (plantillas.length === 0) {
            elementos.plantillasList.innerHTML = '<p class="empty-message">Aún no hay plantillas disponibles.</p>';
            elementos.categoriaSelect.innerHTML = '<option value="">Sin categorías</option>';
            return;
        }

        cargarCategorias();
    } catch (error) {
        console.error('Error cargando plantillas:', error);
        elementos.plantillasList.innerHTML = '<p class="empty-message">No se pudieron cargar las plantillas.</p>';
    }
}

function cargarCategorias() {
    const categorias = [...new Set(plantillas.map(p => p.categoria))];

    elementos.categoriaSelect.innerHTML = '<option value="">Selecciona una categoría</option>';
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        elementos.categoriaSelect.appendChild(option);
    });

    if (categorias.length > 0) {
        elementos.categoriaSelect.value = categorias[0];
        mostrarPlantillasPorCategoria(categorias[0]);
    }
}

function mostrarPlantillasPorCategoria(categoria) {
    const filtradas = plantillas.filter(p => p.categoria === categoria);

    let html = '';
    if (filtradas.length === 0) {
        html = '<p class="empty-message">No hay plantillas en esta categoría.</p>';
    } else {
        filtradas.forEach(plantilla => {
            const seleccionada = plantillaSeleccionada?.id === plantilla.id;
            html += `
                <div class="plantilla-card ${seleccionada ? 'seleccionada' : ''}" data-id="${escaparHTML(plantilla.id)}">
                    <div class="plantilla-titulo">${escaparHTML(plantilla.icono)} ${escaparHTML(plantilla.titulo)}</div>
                    <div class="plantilla-descripcion">${escaparHTML(plantilla.descripcion)}</div>
                </div>
            `;
        });
    }

    elementos.plantillasList.innerHTML = html;

    elementos.plantillasList.querySelectorAll('.plantilla-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            seleccionarPlantilla(id);
        });
    });
}

function seleccionarPlantilla(id) {
    const plantilla = plantillas.find(p => p.id === id);
    if (!plantilla) return;

    plantillaSeleccionada = plantilla;

    // Actualizar selección visual
    elementos.plantillasList.querySelectorAll('.plantilla-card').forEach(card => {
        card.classList.toggle('seleccionada', card.dataset.id === id);
    });

    renderizarFormularioPlantilla(plantilla);
}

function renderizarFormularioPlantilla(plantilla) {
    let html = '';
    plantilla.campos.forEach(campo => {
        const valor = campo.valor || '';
        html += `<div class="form-group">`;
        html += `<label for="campo-${escaparHTML(campo.nombre)}">${escaparHTML(campo.etiqueta || campo.nombre)}</label>`;

        if (campo.tipo === 'textarea') {
            html += `<textarea id="campo-${escaparHTML(campo.nombre)}" data-campo="${escaparHTML(campo.nombre)}" placeholder="${escaparHTML(campo.placeholder || '')}">${escaparHTML(valor)}</textarea>`;
        } else if (campo.tipo === 'select') {
            const opciones = Array.isArray(campo.opciones) ? campo.opciones : [];
            html += `<select id="campo-${escaparHTML(campo.nombre)}" data-campo="${escaparHTML(campo.nombre)}">`;
            opciones.forEach(opcion => {
                const selected = opcion === valor ? 'selected' : '';
                html += `<option value="${escaparHTML(opcion)}" ${selected}>${escaparHTML(opcion)}</option>`;
            });
            html += `</select>`;
        } else {
            html += `<input type="${campo.tipo || 'text'}" id="campo-${escaparHTML(campo.nombre)}" data-campo="${escaparHTML(campo.nombre)}" placeholder="${escaparHTML(campo.placeholder || '')}" value="${escaparHTML(valor)}">`;
        }

        html += `</div>`;
    });

    elementos.formContainer.innerHTML = html || '<p class="empty-message">Esta plantilla no tiene campos configurados.</p>';

    // Limpiar prompt y avisos anteriores
    elementos.promptPreview.innerHTML = '<p class="empty-message">El prompt aparecerá aquí...</p>';
    ocultarAvisoCampos();
}

// ==================== GENERACIÓN DE PROMPT ====================
function generarPrompt() {
    if (!plantillaSeleccionada) {
        elementos.promptPreview.innerHTML = '<p class="empty-message">Selecciona una plantilla primero.</p>';
        return;
    }

    const valores = {};
    const camposVacios = [];
    const inputs = elementos.formContainer.querySelectorAll('[data-campo]');
    inputs.forEach(input => {
        const valor = input.value.trim();
        valores[input.dataset.campo] = valor;
        if (!valor) {
            const label = elementos.formContainer.querySelector(`label[for="${input.id}"]`);
            camposVacios.push(label ? label.textContent : input.dataset.campo);
        }
    });

    let prompt = plantillaSeleccionada.promptTemplate || '';

    // Reemplazar marcadores {nombreCampo}
    Object.keys(valores).forEach(key => {
        const regex = new RegExp(`\\{${key}\\}`, 'g');
        prompt = prompt.replace(regex, valores[key] || '');
    });

    elementos.promptPreview.textContent = prompt;

    if (camposVacios.length > 0) {
        mostrarAvisoCampos(`Dejaste vacío: ${camposVacios.join(', ')}. El prompt puede quedar incompleto.`);
    } else {
        ocultarAvisoCampos();
    }
}

function mostrarAvisoCampos(mensaje) {
    if (!elementos.camposWarning) return;
    elementos.camposWarning.textContent = mensaje;
    elementos.camposWarning.style.display = 'block';
}

function ocultarAvisoCampos() {
    if (!elementos.camposWarning) return;
    elementos.camposWarning.textContent = '';
    elementos.camposWarning.style.display = 'none';
}

// ==================== ACCIONES ====================
function copiarPrompt() {
    const prompt = elementos.promptPreview.textContent.trim();
    if (!prompt) {
        alert('No hay prompt para copiar.');
        return;
    }

    if (navigator.clipboard) {
        navigator.clipboard.writeText(prompt).then(() => {
            alert('Prompt copiado al portapapeles.');
        }).catch(() => {
            fallbackCopiar(prompt);
        });
    } else {
        fallbackCopiar(prompt);
    }
}

function fallbackCopiar(texto) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        alert('Prompt copiado al portapapeles.');
    } catch (error) {
        console.error('No se pudo copiar el prompt:', error);
        alert('No se pudo copiar automáticamente. Selecciona y copia el texto manualmente.');
    } finally {
        document.body.removeChild(textarea);
    }
}

function descargarPrompt() {
    const prompt = elementos.promptPreview.textContent.trim();
    if (!prompt) {
        alert('No hay prompt para descargar.');
        return;
    }

    const blob = new Blob([prompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt.txt';
    a.click();
    URL.revokeObjectURL(url);
}

async function compartirPrompt() {
    const prompt = elementos.promptPreview.textContent.trim();
    if (!prompt) {
        alert('No hay prompt para compartir.');
        return;
    }

    if (navigator.share) {
        try {
            await navigator.share({ title: 'PromptCraft', text: prompt });
        } catch (error) {
            console.warn('Error al compartir:', error);
        }
    } else {
        copiarPrompt();
    }
}

// ==================== UTILIDADES ====================
function escaparHTML(valor) {
    const div = document.createElement('div');
    div.textContent = String(valor ?? '');
    return div.innerHTML;
}

// ==================== EVENTOS ====================
function configurarEventos() {
    elementos.googleLoginBtn.addEventListener('click', iniciarSesionGoogle);
    elementos.btnLogout.addEventListener('click', cerrarSesion);

    elementos.categoriaSelect.addEventListener('change', () => {
        const categoria = elementos.categoriaSelect.value;
        if (categoria) {
            plantillaSeleccionada = null;
            elementos.formContainer.innerHTML = '<p class="empty-message">Selecciona una plantilla para comenzar.</p>';
            elementos.promptPreview.innerHTML = '<p class="empty-message">El prompt aparecerá aquí...</p>';
            ocultarAvisoCampos();
            mostrarPlantillasPorCategoria(categoria);
        }
    });

    elementos.btnGenerarPrompt.addEventListener('click', generarPrompt);
    elementos.btnCopy.addEventListener('click', copiarPrompt);
    elementos.btnDownload.addEventListener('click', descargarPrompt);
    elementos.btnShare.addEventListener('click', compartirPrompt);
}
