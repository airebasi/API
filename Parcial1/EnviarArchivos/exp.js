const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
app.use(cors());

app.get('/sendFile', (req, res) => {
    let archivo=path.join(__dirname,'/imagenes/send.jpg');
    res.sendFile(archivo);
});


app.get('/download', (req, res) => {
    let archivo=path.join(__dirname,'/imagenes/download.jpg');
    res.download(archivo);
});

app.get('/attachment', (req, res) => {
    let archivo = path.join(__dirname, '../imagenes', 'attach.jpg');
    res.attachment(archivo, (err) => {
if (err) {
    console.log(err);
    res.status(500).send("Error con el archivo");
}
else {
    res.send("Archivo descargado")
}
    });
    res.send()
});



app.listen(3000, () => {
    console.log('Server Express escuchando en puerto 3000');
});