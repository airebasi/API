const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const port = process.env.PORT || 8082;
const datosReadme = fs.readFileSync(path.join(__dirname,'readme.md'),{ encoding: 'utf8', flag: 'r' }); 
const redoc = require('redoc-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Empleados',
            version: '1.0.0',
            description: datosReadme 
        },
        servers: [
            { url: `http://localhost:${port}` }
        ],
    },
    apis: ["./*.js"],
};

app.use(cors()); // Middleware de Terceros

/**
 * @swagger
 * tags:
 *   - name: empleados
 *     description: Endpoints para consultar empleados
 */

/**
 * @swagger
 * /empleado:
 *   get:
 *     tags:
 *       - empleados
 *     description: Consultar todos los empleados
 *     responses:
 *       200:
 *         description: Regresa un arreglo de objetos con los empleados.
 */
app.get('/empleado', (req, res) => {
    res.json({ mensaje: 'Server Express contestando a petición get' });
});

/**
 * @swagger
 * /empleado:
 *   post:
 *     tags:
 *       - empleados
 *     summary: Obtener un Usuario 
 *     description: Devuelve el resultado de la operacion
 *     responses:
 *       200:
 *         description: Publica un arreglo de objetos con los empleados.
 */
app.post('/empleado', (req, res) => {
});


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get("/Spec", (req, res) => {
    res.json(swaggerDocs)
});

/**
 * @swagger
 * components:
 *   schemas:
 *     usuario:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: string
 *           example: 12
 *         nombre:
 *           type: string
 *           example: Isabel
 *         ap_paterno:
 *           type: string
 *           example: Campos
 */

app.get('/api-docs-2/swagger.json', (req, res) => {
    res.json(swaggerDocs);
});

app.get(
    '/api-docs-2',
    redoc({
        title: 'API Docs',
        specUrl: 'http://localhost:8082/api-docs-2/swagger.json',
        redocOptions: {
            theme: {
                colors: {
                    primary: {
                        main: '#6EC5AB'
                    }
                }
            }
        }
    })
);
 
// Arrancar el servidor
app.listen(port, () => {
    console.log(`Server Express escuchando en puerto ${port}`);
});
