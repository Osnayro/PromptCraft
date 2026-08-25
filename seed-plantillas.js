/**
 * PromptCraft — Seed de Plantillas para Firestore
 * Ejecuta sincronizarPlantillas() en la consola del navegador
 * después de cargar firebase-config.js y tener reglas que permitan escritura.
 */

const plantillasSeed = [
    {
        id: 'resumen-ejecutivo',
        categoria: 'Textos y comunicaciones',
        titulo: 'Resumen ejecutivo de tema',
        descripcion: 'Genera un resumen ejecutivo profesional de cualquier tema.',
        icono: '📄',
        campos: [
            { nombre: 'tema', etiqueta: 'Tema', tipo: 'text', placeholder: 'Transformación digital en pymes', valor: '' },
            { nombre: 'audiencia', etiqueta: 'Audiencia', tipo: 'select', opciones: ['Ejecutivos', 'Accionistas', 'Clientes', 'Público general'], valor: 'Ejecutivos' },
            { nombre: 'tono', etiqueta: 'Tono', tipo: 'select', opciones: ['Formal', 'Ejecutivo', 'Persuasivo', 'Neutral'], valor: 'Ejecutivo' },
            { nombre: 'extension', etiqueta: 'Extensión', tipo: 'select', opciones: ['Corta (1 página)', 'Media (2-3 páginas)', 'Larga (5+ páginas)'], valor: 'Media (2-3 páginas)' },
            { nombre: 'incluir', etiqueta: 'Elementos a incluir', tipo: 'textarea', placeholder: 'Conclusiones, recomendaciones...', valor: 'Contexto, objetivos, hallazgos clave, recomendaciones' },
            { nombre: 'formato', etiqueta: 'Formato de salida', tipo: 'select', opciones: ['Markdown', 'JSON', 'Texto plano', 'HTML'], valor: 'Markdown' }
        ],
        promptTemplate: 'Actúa como consultor senior. Elabora un resumen ejecutivo sobre "{tema}" dirigido a {audiencia}. Tono {tono}. Extensión {extension}. Incluye: {incluir}. Formato de salida: {formato}.'
    },
    {
        id: 'informe-tecnico',
        categoria: 'Textos y comunicaciones',
        titulo: 'Informe técnico profesional',
        descripcion: 'Crea un informe técnico detallado y formal.',
        icono: '📊',
        campos: [
            { nombre: 'titulo', etiqueta: 'Título', tipo: 'text', placeholder: 'Evaluación de infraestructura TI', valor: '' },
            { nombre: 'area', etiqueta: 'Área', tipo: 'text', placeholder: 'Ingeniería, TI...', valor: '' },
            { nombre: 'normas', etiqueta: 'Normas', tipo: 'text', placeholder: 'ISO 9001', valor: 'ISO 9001' },
            { nombre: 'destinatario', etiqueta: 'Destinatario', tipo: 'text', placeholder: 'Gerente de proyectos', valor: '' },
            { nombre: 'incluir_graficos', etiqueta: '¿Incluir gráficos?', tipo: 'select', opciones: ['Sí', 'No'], valor: 'Sí' },
            { nombre: 'formato', etiqueta: 'Formato', tipo: 'select', opciones: ['Markdown', 'LaTeX', 'Texto plano'], valor: 'Markdown' }
        ],
        promptTemplate: 'Eres ingeniero senior en {area}. Redacta informe técnico "{titulo}" para {destinatario}. Normas: {normas}. Gráficos: {incluir_graficos}. Formato: {formato}. Incluye antecedentes, metodología, resultados, análisis y conclusiones.'
    },
    {
        id: 'comunicacion-formal',
        categoria: 'Textos y comunicaciones',
        titulo: 'Comunicación formal',
        descripcion: 'Redacta una comunicación formal para tu organización.',
        icono: '✉️',
        campos: [
            { nombre: 'tipo', etiqueta: 'Tipo', tipo: 'select', opciones: ['Correo', 'Carta', 'Circular', 'Memorando'], valor: 'Correo' },
            { nombre: 'motivo', etiqueta: 'Motivo', tipo: 'text', placeholder: 'Solicitud de reunión', valor: '' },
            { nombre: 'destinatario', etiqueta: 'Destinatario', tipo: 'text', placeholder: 'Director de operaciones', valor: '' },
            { nombre: 'tono', etiqueta: 'Tono', tipo: 'select', opciones: ['Formal', 'Amable', 'Firme'], valor: 'Formal' },
            { nombre: 'longitud', etiqueta: 'Longitud', tipo: 'select', opciones: ['Breve', 'Media', 'Detallada'], valor: 'Media' }
        ],
        promptTemplate: 'Redacta una {tipo} con tono {tono} dirigida a {destinatario}. Motivo: {motivo}. Longitud: {longitud}. Incluye saludo, cuerpo claro y despedida formal.'
    },
    {
        id: 'informe-ingenieria',
        categoria: 'Ingeniería y ciencias',
        titulo: 'Informe técnico de ingeniería',
        descripcion: 'Crea un informe de ingeniería con estructura profesional.',
        icono: '🏗️',
        campos: [
            { nombre: 'proyecto', etiqueta: 'Proyecto', tipo: 'text', placeholder: 'Puente peatonal', valor: '' },
            { nombre: 'especialidad', etiqueta: 'Especialidad', tipo: 'select', opciones: ['Civil', 'Mecánica', 'Eléctrica', 'Software', 'Industrial'], valor: 'Civil' },
            { nombre: 'normativa', etiqueta: 'Normativa', tipo: 'text', placeholder: 'Código estructural', valor: '' },
            { nombre: 'entregables', etiqueta: 'Entregables', tipo: 'textarea', placeholder: 'Planos, cálculos...', valor: '' },
            { nombre: 'formato', etiqueta: 'Formato', tipo: 'select', opciones: ['Markdown', 'LaTeX', 'Word'], valor: 'Markdown' }
        ],
        promptTemplate: 'Actúa como ingeniero {especialidad} senior. Genera informe técnico para proyecto "{proyecto}". Normativa: {normativa}. Entregables: {entregables}. Formato: {formato}. Incluye introducción, alcance, metodología, cálculos, resultados y conclusiones.'
    },
    {
        id: 'solicitud-informacion-tecnica',
        categoria: 'Ingeniería y ciencias',
        titulo: 'Solicitud de información técnica',
        descripcion: 'Genera una solicitud formal de información técnica.',
        icono: '🔍',
        campos: [
            { nombre: 'empresa', etiqueta: 'Empresa destinataria', tipo: 'text', placeholder: 'Proveedor de equipos', valor: '' },
            { nombre: 'asunto', etiqueta: 'Asunto', tipo: 'text', placeholder: 'Especificaciones de transformadores', valor: '' },
            { nombre: 'preguntas', etiqueta: 'Preguntas o datos', tipo: 'textarea', placeholder: 'Potencia, voltaje...', valor: '' },
            { nombre: 'formato_respuesta', etiqueta: 'Formato de respuesta', tipo: 'select', opciones: ['Tabla', 'Lista', 'PDF'], valor: 'Tabla' }
        ],
        promptTemplate: 'Redacta solicitud formal de información técnica para {empresa}. Asunto: {asunto}. Solicita: {preguntas}. Formato de respuesta: {formato_respuesta}.'
    },
    {
        id: 'memoria-calculo',
        categoria: 'Ingeniería y ciencias',
        titulo: 'Memoria de cálculo',
        descripcion: 'Crea una memoria de cálculo estructurada.',
        icono: '📐',
        campos: [
            { nombre: 'calculo', etiqueta: 'Cálculo', tipo: 'text', placeholder: 'Dimensionamiento de viga', valor: '' },
            { nombre: 'metodologia', etiqueta: 'Metodología', tipo: 'text', placeholder: 'Estados límites', valor: '' },
            { nombre: 'formulas', etiqueta: 'Fórmulas', tipo: 'textarea', placeholder: 'M = wl²/8...', valor: '' },
            { nombre: 'formato', etiqueta: 'Formato', tipo: 'select', opciones: ['Markdown', 'LaTeX', 'Word'], valor: 'Markdown' }
        ],
        promptTemplate: 'Como ingeniero calculista, elabora memoria de cálculo para "{calculo}" con metodología {metodologia}. Fórmulas: {formulas}. Formato: {formato}. Incluye datos, hipótesis, cálculo, resultados y verificación.'
    },
    {
        id: 'analisis-causa-raiz',
        categoria: 'Ingeniería y ciencias',
        titulo: 'Análisis de causa raíz',
        descripcion: 'Genera un informe de análisis de causa raíz (ACR).',
        icono: '🧠',
        campos: [
            { nombre: 'problema', etiqueta: 'Problema', tipo: 'text', placeholder: 'Falla en bomba', valor: '' },
            { nombre: 'metodologia', etiqueta: 'Metodología', tipo: 'select', opciones: ['5 Porqués', 'Ishikawa', 'FMEA'], valor: '5 Porqués' },
            { nombre: 'datos', etiqueta: 'Datos disponibles', tipo: 'textarea', placeholder: 'Fechas, fallas...', valor: '' },
            { nombre: 'formato', etiqueta: 'Formato', tipo: 'select', opciones: ['Markdown', 'Texto plano'], valor: 'Markdown' }
        ],
        promptTemplate: 'Actúa como ingeniero de confiabilidad. Realiza ACR para "{problema}" usando {metodologia}. Datos: {datos}. Entrega causa raíz, acciones correctivas y preventivas. Formato: {formato}.'
    },
    {
        id: 'imagen-conceptual',
        categoria: 'Imagen y video',
        titulo: 'Generación de imagen conceptual',
        descripcion: 'Crea un prompt para generar imágenes con IA.',
        icono: '🎨',
        campos: [
            { nombre: 'concepto', etiqueta: 'Concepto', tipo: 'text', placeholder: 'Ciudad futurista', valor: '' },
            { nombre: 'estilo', etiqueta: 'Estilo', tipo: 'select', opciones: ['Fotorrealista', 'Acuarela', '3D', 'Isométrico', 'Cinematográfico'], valor: 'Fotorrealista' },
            { nombre: 'iluminacion', etiqueta: 'Iluminación', tipo: 'text', placeholder: 'Atardecer dorado', valor: '' },
            { nombre: 'paleta', etiqueta: 'Paleta', tipo: 'text', placeholder: 'Neón', valor: '' },
            { nombre: 'negativo', etiqueta: 'Evitar', tipo: 'text', placeholder: 'texto, marcas', valor: '' }
        ],
        promptTemplate: 'Genera imagen de {concepto}. Estilo: {estilo}. Iluminación: {iluminacion}. Paleta: {paleta}. Evitar: {negativo}. Alta resolución, 4K, detalle fino.'
    },
    {
        id: 'modificar-imagen',
        categoria: 'Imagen y video',
        titulo: 'Modificación de imagen',
        descripcion: 'Prompt para editar o retocar una imagen.',
        icono: '🖼️',
        campos: [
            { nombre: 'descripcion_actual', etiqueta: 'Imagen actual', tipo: 'textarea', placeholder: 'Casa blanca...', valor: '' },
            { nombre: 'cambios', etiqueta: 'Cambios', tipo: 'textarea', placeholder: 'Cielo anochecer...', valor: '' },
            { nombre: 'estilo', etiqueta: 'Mantener estilo', tipo: 'select', opciones: ['Sí', 'No'], valor: 'Sí' }
        ],
        promptTemplate: 'Modifica imagen: {descripcion_actual}. Cambios: {cambios}. Mantener estilo: {estilo}.'
    },
    {
        id: 'fusionar-imagenes',
        categoria: 'Imagen y video',
        titulo: 'Fusión de imágenes',
        descripcion: 'Prompt para combinar dos imágenes.',
        icono: '🪄',
        campos: [
            { nombre: 'imagen1', etiqueta: 'Primera imagen', tipo: 'text', placeholder: 'León', valor: '' },
            { nombre: 'imagen2', etiqueta: 'Segunda imagen', tipo: 'text', placeholder: 'Paisaje nevado', valor: '' },
            { nombre: 'resultado', etiqueta: 'Resultado', tipo: 'text', placeholder: 'León en nieve', valor: '' },
            { nombre: 'estilo', etiqueta: 'Estilo', tipo: 'select', opciones: ['Fotorrealista', 'Surrealista', 'Arte digital'], valor: 'Fotorrealista' }
        ],
        promptTemplate: 'Combina {imagen1} con {imagen2}. Resultado: {resultado}. Estilo: {estilo}. Transición suave, iluminación coherente, alta resolución.'
    },
    {
        id: 'video-especializado',
        categoria: 'Imagen y video',
        titulo: 'Video especializado',
        descripcion: 'Genera un prompt para video con IA.',
        icono: '🎬',
        campos: [
            { nombre: 'tema', etiqueta: 'Tema', tipo: 'text', placeholder: 'Tour laboratorio', valor: '' },
            { nombre: 'duracion', etiqueta: 'Duración', tipo: 'select', opciones: ['15s', '30s', '1 min', '3 min'], valor: '30s' },
            { nombre: 'escenas', etiqueta: 'Escenas', tipo: 'textarea', placeholder: 'Inicio, desarrollo...', valor: '' },
            { nombre: 'audio', etiqueta: 'Audio', tipo: 'select', opciones: ['Música suave', 'Voz en off', 'Sin audio'], valor: 'Música suave' },
            { nombre: 'transiciones', etiqueta: 'Transiciones', tipo: 'select', opciones: ['Suaves', 'Rápidas', 'Cinematográficas'], valor: 'Suaves' }
        ],
        promptTemplate: 'Crea video de {duracion} sobre "{tema}". Escenas: {escenas}. Audio: {audio}. Transiciones: {transiciones}. Estilo cinematográfico, alta definición.'
    },
    {
        id: 'analisis-foda',
        categoria: 'Negocios y análisis',
        titulo: 'Análisis FODA',
        descripcion: 'Genera un análisis FODA completo.',
        icono: '📌',
        campos: [
            { nombre: 'empresa', etiqueta: 'Empresa', tipo: 'text', placeholder: 'Startup', valor: '' },
            { nombre: 'mercado', etiqueta: 'Mercado', tipo: 'text', placeholder: 'Fintech', valor: '' },
            { nombre: 'formato', etiqueta: 'Formato', tipo: 'select', opciones: ['Tabla', 'Lista'], valor: 'Tabla' }
        ],
        promptTemplate: 'Realiza análisis FODA para {empresa} en sector {mercado}. Formato: {formato}. Prioriza hallazgos según impacto.'
    },
    {
        id: 'propuesta-comercial',
        categoria: 'Negocios y análisis',
        titulo: 'Propuesta comercial',
        descripcion: 'Crea una propuesta comercial persuasiva.',
        icono: '💼',
        campos: [
            { nombre: 'cliente', etiqueta: 'Cliente', tipo: 'text', placeholder: 'Empresa ABC', valor: '' },
            { nombre: 'servicio', etiqueta: 'Servicio', tipo: 'text', placeholder: 'Software', valor: '' },
            { nombre: 'beneficios', etiqueta: 'Beneficios', tipo: 'textarea', placeholder: 'Ahorro, rapidez...', valor: '' },
            { nombre: 'tono', etiqueta: 'Tono', tipo: 'select', opciones: ['Persuasivo', 'Formal', 'Amigable'], valor: 'Persuasivo' }
        ],
        promptTemplate: 'Redacta propuesta comercial para {cliente} ofreciendo {servicio}. Beneficios: {beneficios}. Tono: {tono}. Incluye propuesta de valor, alcance, inversión y llamado a la acción.'
    }
];

async function sincronizarPlantillas() {
    if (!window.db) {
        console.error('Firestore no disponible.');
        return;
    }

    for (const plantilla of plantillasSeed) {
        const { id, ...datos } = plantilla;
        await window.db.collection('plantillas').doc(id).set(datos, { merge: true });
    }

    console.log(`✅ ${plantillasSeed.length} plantillas sincronizadas en Firestore.`);
}

window.sincronizarPlantillas = sincronizarPlantillas;
```

---

Décimo archivo listo.
Contiene 13 plantillas listas para sincronizar.

🚀 Cómo usarlo

1. Abre index.html en tu navegador con la app PromptCraft.
2. Asegúrate de estar autenticado como administrador (o con reglas temporales que permitan escritura en plantillas).
3. Abre la consola (F12).
4. Pega el código anterior y ejecuta:

```javascript
sincronizarPlantillas();
