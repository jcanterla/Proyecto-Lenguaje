const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const rss = require('rss');

const json = path.join(__dirname, '/public/Noticias.json');

app.use(express.static(__dirname + '/public'));

app.port = 3000;
app.listen(app.port, () => {
    console.log(`Server running on port http://localhost:${app.port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/recibe', (req, res) => {
    let categoria = req.body.categoria;
    let titulo = req.body.titulo;
    let autor = req.body.autor;
    let descripcion = req.body.descripcion;
    let fecha = req.body.fecha;
    let enlace = req.body.enlace;

    let nuevoJson = {
        "categoria": categoria,
        "titulo": titulo,
        "autor": autor,
        "descripcion": descripcion,
        "fecha": fecha,
        "enlace": enlace
    };

    fs.readFile(json, 'utf-8', (err, data) => {
        if (err) throw err;
        let noticias = JSON.parse(data);
        noticias.push(nuevoJson);
        fs.writeFile(json, JSON.stringify(noticias), (err) => {
            if (err) throw err;
            console.log('Noticia agregada');
        });
    });
});

app.get('/rss', (req, res) => {
    let feed = new rss({
        title: 'Noticias',
        description: 'Noticias de la semana',
        feed_url: 'http://localhost:3000/rss',
        site_url: 'http://localhost:3000',
        image_url: 'http://localhost:3000/icon.png',
        managingEditor: ''
    });
    fs.readFile(json, 'utf-8', (err, data) => {
        if (err) throw err;
        let noticias = JSON.parse(data);
        noticias.reverse();
        let numero = 0;
        noticias.forEach((noticia, index) => {
            if(numero < 5){
                feed.item({
                    title: noticia.titulo,
                    description: noticia.descripcion,
                    categoria: noticia.categoria,
                    url: `http://localhost:3000/HTMLS/newsDetail${index}.html`,
                    date: noticia.fecha
                });
                numero++;
            }
        });
        res.set('Content-Type', 'text/xml');
        res.send(feed.xml());
    });
});
app.use('/HTMLS', express.static(path.join(__dirname, 'HTMLS')));

// Leer el archivo JSON
const data = require('./public/Noticias.json');

// Tomar las últimas 5 noticias
const lastFive = data.slice(-5);

// Invertir el orden del array
lastFive.reverse();

// Para cada noticia, crear un archivo HTML
lastFive.forEach((news, index) => {
    const html = `
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>${news.titulo}</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            </head>
            <body>
                <div class="collapse" id="navbarToggleExternalContent">
                    <div class="bg-dark p-4">
                        <h5 class="text-white h4">Collapsed content</h5>
                        <span class="text-muted">Toggleable via the navbar brand.</span>
                    </div>
                </div>
                <nav class="navbar navbar-dark bg-dark">
                    <div class="container-fluid text-start">
                        <a class="navbar-nav nav-link active text-white" aria-current="page" href="index.html">NOTICIAS</a>
                    </div>
                </nav>
                <div class="container">
                    <div class="card mt-4">
                        <div class="card-body">
                            <h3 class="card-title">${news.titulo}</h3>
                            <h5 class="card-subtitle mb-2 text-muted">${news.autor}</h5>
                            <p class="card-text">${news.categoria}</p>
                            <p class="card-text">${news.descripcion}</p>
                            <p class="card-text"><small class="text-muted">${news.fecha}</small></p>
                            <a href="${news.enlace}" class="card-link">Leer más</a>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `;

    fs.writeFileSync(path.join(__dirname, 'HTMLS', `newsDetail${index}.html`), html);
});
