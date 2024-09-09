const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');

const app = express();
const upload = multer();

bodyParserXml(bodyParser);  // Para procesar XML

app.use(cors());                              // Middleware de terceros
app.use(bodyParser.json());                   // Middleware para JSON
app.use(bodyParser.text());                   // Middleware para texto
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para URL-encoded
app.use(upload.none());                      // Middleware para parsear form-data
app.use(bodyParser.xml());                   // Middleware para parsear XML a JSON

// Parametros de consulta y ruta
app.put('/clientes/:id', (req, res) => {
    const queryParams = req.query;
    const routeParams = req.params;
    const body = req.body;

    //Agregue los otros campos solo para saber como funciona
    console.log('Query Parameters:', queryParams);
    console.log('Route Parameters:', routeParams);
    console.log('Request Body:', body);

    res.json({
        mensaje: 'Server Express contestando a petición PUT',
        queryParams: queryParams,
        routeParams: routeParams,
        body: body
    });
});

app.listen(3000, () => {
    console.log('Server Express escuchando en puerto 3000');
});
