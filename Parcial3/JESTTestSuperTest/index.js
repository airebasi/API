const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/empleado', (req, res) => {
    res.json({ message : 'Servidor funcionando en 8002'});
});

app.listen(3001, () => console.log("Server is listening on 8002")); // Inicia el servidor en el puerto 8082