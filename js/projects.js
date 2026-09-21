/* =====================================================================
   ADMINISTRA AQUÍ TU PORTAFOLIO

   Para agregar un trabajo nuevo:
   1. Copia uno de los bloques { ... } de la lista PROJECTS.
   2. Pégalo AL INICIO de la lista (el primero aparece como "Último trabajo").
   3. Cambia sus datos y guarda. No hay que tocar el HTML ni el CSS.

   Campos de cada trabajo
   - title        Nombre del trabajo.
   - description  Una o dos frases que expliquen qué hace.
   - type         Categoría: "Ejercicio", "Proyecto", "Diseño" o la que quieras.
                  Con ella se crean solos los botones de filtro.
   - clase        Número de la clase (opcional). Muestra "Clase 3".
   - meta         Texto que reemplaza a "Clase N" (opcional).
   - tags         Lista de tecnologías, por ejemplo ["HTML", "CSS"].
   - href         Enlace al trabajo. Para una carpeta del repo:
                  "modules/class4/index.html". Puede ser un enlace externo.
   - code         Enlace al código en GitHub (opcional).
   ===================================================================== */

window.SITE = {
  repo: "https://github.com/diana1022004/desarrollo-de-aplicaciones-web",
  // Muestra al final de la lista una fila que anuncia el próximo trabajo.
  // Cámbialo a false si no la quieres.
  comingSoon: true
};

window.PROJECTS = [
  {
    title: "Procesar solicitud",
    description:
      "Función de una biblioteca que recibe una solicitud de préstamo y reorganiza el array con shift, unshift y push. Incluye una demo para probarla.",
    type: "Ejercicio",
    clase: 3,
    tags: ["JavaScript", "Arrays"],
    href: "modules/class3/index.html",
    code: "https://github.com/diana1022004/desarrollo-de-aplicaciones-web/tree/main/modules/class3"
  },
  {
    title: "Mi Libro Financiero",
    description:
      "Aplicación de finanzas personales: caracteriza tus ingresos y gastos fijos, registra gastos diarios y muestra el resumen del mes. Guarda los datos en el navegador con localStorage.",
    type: "Proyecto",
    meta: "Proyecto propio",
    tags: ["HTML", "CSS", "JavaScript", "localStorage"],
    href: "modules/caracterizacion-y-presupuesto/index.html",
    code: "https://github.com/diana1022004/Caracterizaci-n-Financiera-y-Presupuesto"
  },
  {
    title: "Rediseño de plataforma e-commerce",
    description:
      "Propuesta de rediseño de una tienda en línea, prototipada en Figma.",
    type: "Diseño",
    clase: 2,
    tags: ["Figma", "UI"],
    href: "https://www.figma.com/make/4cFjc6qSwJ2ZWATA0oM1bF/Redesign-E-commerce-Platform?code-node-id=0-6&p=f&fullscreen=1"
  }
];
