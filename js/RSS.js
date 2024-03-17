// Botón RSS
const botonRSS = document.getElementById("RSS");
botonRSS.addEventListener("click", creaXML);

// Saco los datos del "localStorage"
const datosRSS = localStorage.getItem("datos");

// Variables
let datosLocal;
let j;

// Esta función crea un XML a partir de los datos del JSON
function creaXML(){

    // Si no hay datos
    if (datos !== 'null') {

        // Creo un Array
        datosLocal = datosRSS.split(";")

        // Si el array list tiene menos de 5 noticias...
        if (datosLocal.length < 5) {

            j = datosLocal.length;

        // Si no...
        } else {

            j = 5;

        }


        let xml =
            `<?xml version="1.0" standalone="yes"?>
            <rss version="2.0">
                <channel>
                    <title>Noticias E4</title>
                    <link>${"https://aleorfu-safa.github.io/E4-LMSGI/"}</link>
                    <description>Sindicación de noticias elaboradas por E4</description>`;

        for(let i=0; i<j; i++){
            datosLocal = JSON.parse(datosRSS.split(";")[i])
            xml = xml + `
                    <item>
                        <title>${datosLocal.titulo}</title>
                        <link>${"https://aleorfu-safa.github.io/E4-LMSGI/noticia"+(i+1)+".html"}</link>
                        <description>${datosLocal.descripcion}</description>
                        <author>${datosLocal.autor}</author>
                        <pubDate>${datosLocal.fecha}</pubDate>
                        <category>${datosLocal.categoria}</category>
                        <enclosure url="${datosLocal.imagen}" length="90000" type="image/jpg"/>
                    </item>`
        }

        xml = xml +
                `</channel>
            </rss>`

         saveAs(URL.createObjectURL(new Blob([xml], {type: "application/xml"})), "noticias.xml");

    }

    // Copiar link
    navigator.clipboard.writeText("https://aleorfu-safa.github.io/E4-LMSGI/noticias.xml");

    // Cambiar texto por un segundo
    botonRSS.innerHTML = "Enlace copiado al portapapeles"
    setTimeout(e => botonRSS.innerHTML = '<img src="content/rss.png" alt="rss" width="15%">&nbsp;&nbsp;&nbsp;&nbsp;¡Suscríbete!', 1000)

}