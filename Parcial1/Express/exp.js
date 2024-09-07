const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server Express contestando a peticion GET');
});

app.post('/', (req, res) => {
    res.send('Server Express contestando a peticion POST');
});

app.listen(3000, () => {
    console.log('Server Express escuchando en puerto 3000');
});

//Razon de error, CACHE