const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');

const app = express();
const upload = multer();

bodyParserXml(bodyParser);  //  ¡Ya funciona!

app.use(cors());                              // Middleware de terceros
app.use(bodyParser.json());                   // Middleware para JSON
app.use(bodyParser.text());                   // Middleware para texto
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para URL-encoded
app.use(upload.none());                      // Middleware para parsear form-data
app.use(bodyParser.xml());                   // Middleware para parsear XML a JSON

app.put('/clientes', (req, res) => {
    console.log('Request Body:', req.body);
    res.json({ mensaje: 'Server Express contestando a petición PUT' });
});

app.listen(3000, () => {
    console.log('Server Express escuchando en puerto 3000');
});

//XML
//<cliente>
//  <Nombre>Isabel</Nombre>
//  <Apellido>Campos</Apellido>
//</cliente>
//
//JSON
//  {
//    "Nombre": "Isabel",
//    "Apellido": "Campos"
//  }
//