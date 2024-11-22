const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const port = process.env.PORT || 8082;

const swaggerOptions = {
    definition: {
    openapi: '3.0.0',
    info: {
    title: 'API Empleados',
    version: '1.0.0',
    },
    servers:[
    { url: `http://localhost:${port}` }
    ],
    },
    apis: ["*.js"],
    };
 
app.use(cors()); // Middleware de Terceros
/**
 * @swagger
 * /empleado:
 *   get:
 *     description: Consultar todos los empleados
 *     responses:
 *       200:
 *         description: Regresa un arreglo de objetos con los empleados.
*/
app.get('/empleado', (req, res) => {
    res.json({ mensaje: 'Server Express contestando a petición get' });
});
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));
 
app.get("/Spec",(req,res) => {
    res.json(swaggerDocs)
})

app.listen(port, () => {
    console.log(`Server Express escuchando en puerto ${port}`);
});