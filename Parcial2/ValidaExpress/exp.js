const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');
const { check, validationResult } = require('express-validator');

const app = express();
const upload = multer();

const alumno = require('./validador.js');

bodyParserXml(bodyParser);  // Para procesar XML

app.use(cors());                              // Middleware de terceros
app.use(bodyParser.json());                   // Middleware para JSON
app.use(bodyParser.text());                   // Middleware para texto
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para URL-encoded
app.use(upload.none());                      // Middleware para parsear form-data
app.use(bodyParser.xml());                   // Middleware para parsear XML a JSON

app.use('/', alumno);

app.listen(3000, () => {
  console.log('Server Express escuchando en puerto 3000');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.json({ error: "Ha ocurrido el siguiente error, favor de reportar", message: err.message });
});