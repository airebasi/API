const express = require('express');
const cors = require('cors');
const multer = require('multer');
//const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');

const clientes = require('./Rutas/Clientes.js');

const app = express();
const upload = multer();

bodyParserXml(bodyParser);  // Para procesar XML)

app.use(cors());                              // Middleware de terceros
app.use(bodyParser.json());                   // Middleware para JSON
app.use(bodyParser.text());                   // Middleware para texto
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para URL-encoded
app.use(upload.none());                      // Middleware para parsear form-data
app.use(bodyParser.xml());                   // Middleware para parsear XML a JSON

//--------------------------------------NOTAS--------------------------------//
//Despues del app.get, deberia de registrar una funcion ()=>{} mas en mi caso estropea las consultas
//Realizar un modulo para el router con un archivo aparte, para mayor limpieza con el router

//Tenia mal definida la ruta, por eso no jalaba
app.use('/alumno', clientes);

app.listen(3000, () => {
  console.log('Server Express escuchando en puerto 3000');
});