// Cogemos los datos del localStorage
let datos = localStorage.getItem('datos');
datos = datos.split(";");

// Variables para más tarde
let html = '';
let json;
let enlace;

// Por cada noticia
datos.forEach(function (valor) {

    // Guardo en "json" el valor de uno de los datos
    json = JSON.parse(valor);

    // Dependiendo de la posicion tendrá un link
    if (valor === datos[0]) {

        enlace = "noticia1.html"

    } else if (valor === datos[1]) {

        enlace = "noticia2.html"

    } else if (valor === datos[2]) {

        enlace = "noticia3.html"

    } else if (valor === datos[3]) {

        enlace = "noticia4.html"

    } else if (valor === datos[4]) {

        enlace = "noticia5.html"

    } else {

        enlace = "index.html"

    }
    
    // Escribo el "html" personalizado
    html = html + `
    <section class="noticia">
        <h2><a href="${enlace}">${json.titulo}</a></h2>
        <h4>${json.descripcion}</h4>
        <h6>${json.categoria}</h6>
        <p>${json.contenido}</p>
    </section>
    `;

})

// Insertar el contenido HTML generado en el "main"
document.querySelector('main').innerHTML = html;
