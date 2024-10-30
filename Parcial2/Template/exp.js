const express = require('express');
const path = require('path'); // Asegúrate de requerir el módulo path
const app = express();
const pug = require('pug');
const cors = require('cors');

app.use(cors());
app.set('view engine', 'pug'); // Pug como motor de plantillas 
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('Server Express contestando a peticion GET');
});

app.get('/ruta', (req, res) => {  
    let opciones = { 
        titulo: "Titulo de la plantilla",        // Estas son cosas que va a contener el archivo pug
        subtitulo: "Subtitulo en la plantilla"   
    }; 
    res.render('plantilla', opciones); // Aquí se busca el archivo .pug
});

app.post('/', (req, res) => {
    res.send('Server Express contestando a peticion POST');
});

app.listen(3000, () => {
    console.log('Server Express escuchando en puerto 3000');
});
