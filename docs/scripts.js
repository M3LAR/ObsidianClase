// Función para cargar el archivo de texto desde la API de GitHub y generar los botones
async function cargarBotones() {
    try {
        // Realizamos la solicitud a la API de GitHub
        const response = await fetch("https://api.github.com/repos/M3LAR/ObsidianClase/contents/index.txt");
        const data = await response.json();

        // El contenido viene en formato Base64, así que lo decodificamos
        const text = atob(data.content);

        // Dividimos el contenido en líneas y seleccionamos el contenedor de botones
        const lineas = text.split('\n').filter(line => line.trim() !== '');
        const contenedorBotones = document.getElementById('buttons');

        // Creamos un botón para cada línea
        lineas.forEach(linea => {
            const boton = document.createElement('button');
            boton.id = linea.trim();
            boton.textContent = linea.trim();
            boton.onclick = () => mostrarPDF(boton.id);

            contenedorBotones.appendChild(boton);
        });
    } catch (error) {
        console.error("Error al cargar los botones:", error);
    }
}

// Llamamos a la función para cargar los botones al cargar la página
document.addEventListener('DOMContentLoaded', cargarBotones);

// Función que muestra el PDF en el iframe
function mostrarPDF(buttonId) {
    // Genera la ruta del PDF basado en el id del botón
    const pdfURL = `./${buttonId}.pdf`;

    // Obtener el iframe y asignarle la ruta del PDF
    const iframe = document.getElementById('pdf-viewer');
    iframe.src = pdfURL;
    iframe.style.display = 'block'; // Mostrar el iframe cuando se haga clic
}
