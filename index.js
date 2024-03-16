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
        noticias.forEach((noticia) => {
            feed.item({
                title: noticia.titulo,
                description: noticia.descripcion,
                url: noticia.enlace,
                date: noticia.fecha
            });
        });
        res.set('Content-Type', 'text/xml');
        res.send(feed.xml());
    });
});

