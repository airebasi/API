const express = require('express');
const cors = require('cors');
const multer = require('multer')
const app = express();
const upload = multer();
require('body-parser-xml')(bodyParser); //Arreglar, NO FUNCIONAL
//Habilitar el servidor para que acepte formularios en XML


app.use(cors());                              //Middleware de terceros
app.use(express.json());                      //Middleware incorporado en Express
app.use(express.text());                      //Middleware incorporado en Express
app.use(express.urlencoded({extended:true})); //Middleware para parsear un formulario URLEndoded
app.use(upload.none());                        //Middleware para parsear un form data
app.use(bodyParser.xml());                     //Middleware para pasar de XML a Jason


app.put('/clientes', (req, res) => {
    console.log(req.body);
    res.json({mensaje:'Server Express contestando a peticion PUT'});
});

app.listen(3000, () => {
    console.log('Server Express escuchando en puerto 3000');
});