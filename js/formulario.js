// Formulario
const formulario = document.getElementById('newsForm');

// Boton submit
const botonSubmit = document.getElementById('guardar');
botonSubmit.addEventListener('click', publicar);

// Boton Vaciar
const botonVaciar = document.getElementById('vaciar');
botonVaciar.addEventListener('click', vaciar);

// Datos extraidos del localStorage
const datos = localStorage.getItem('datos');

// Función guardar datos
function publicar() {

    // Si no hay datos
    if (datos == 'null') {

        // Se añaden los datos de forma normal
        localStorage.setItem('datos',  JSON.stringify(Object.fromEntries(new FormData(formulario))));

    } else {

        // Se añaden los datos usando un ; para poder separarlos más tarde
        localStorage.setItem('datos',  JSON.stringify(Object.fromEntries(new FormData(formulario))) + ";" + datos);

    }

}

// Funcion vaciar datos
function vaciar() {

    // Vacia el contenido del localStorage
    localStorage.setItem('datos', null)

}