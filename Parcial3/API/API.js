const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');  //Compatibilidad de PostgreSQL
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');

const app = express();
const port = 5432;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Juegos de Mesa',
      version: '1.0.0',
      description: 'API para gestionar juegos de mesa',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Servidor local',
      },
    ],
  },
  apis: ['*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);

const theme = new SwaggerTheme();
const options = {
  explorer: true,
  customCss: `
    ${theme.getBuffer(SwaggerThemeNameEnum.DARK_MONOKAI)} 
    /* Personalización adicional */
    .swagger-ui .topbar {
      background: #333;
      background-image: url('https://png.pngtree.com/thumb_back/fw800/background/20231226/pngtree-vector-polyhedral-gaming-accessory-texture-seamless-print-of-dice-pattern-for-image_13904966.png');
      background-size: cover;
      background-position: center;
    }
  `,
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, options));

app.use(bodyParser.json());

const connectionString = 'postgresql://isa:EtTz7pIEV5ilJ7WM9mXKdobnXdS4d42w@dpg-ct8esra3esus73954n4g-a.oregon-postgres.render.com/juegos_mesa_api_6dm5';
const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,  
  },
});

client.connect()
  .then(() => console.log('Conectado a PostgreSQL en Railway'))
  .catch(err => console.error('Error al conectar a PostgreSQL:', err));

/**
 * @swagger
 * tags:
 *   - name: Acciones
 *     description: Opciones disponibles de la API
 */

/**
 * @swagger
 * /api/juegos:
 *   get:
 *     tags:
 *       - Acciones
 *     summary: Obtiene todos los juegos de mesa
 *     responses:
 *       200:
 *         description: Lista de juegos
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   genero:
 *                     type: string
 *                   cantidad_de_jugadores:
 *                     type: integer
 *                   duracion_promedio:
 *                     type: string
 */
app.get('/api/juegos', async (req, res) => {
    try {
        console.log("Consultando juegos...");
        const result = await client.query('SELECT * FROM Juegos');
        console.log("Juegos obtenidos:", result.rows);  // Muestra los juegos obtenidos
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener los juegos:", error);  // Mostrar el error completo
        res.status(500).json({ error: 'Error al obtener los juegos', details: error.message });
    }
});


/**
 * @swagger
 * /api/juegos/{id}:
 *   get:
 *     tags:
 *       - Acciones
 *     summary: Obtiene un juego por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del juego
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Juego encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                 genero:
 *                   type: string
 *                 cantidad_de_jugadores:
 *                   type: integer
 *                 duracion_promedio:
 *                   type: string
 */
app.get('/api/juegos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('SELECT * FROM Juegos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Juego no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el juego' });
    }
});

/**
 * @swagger
 * /api/juegos:
 *   post:
 *     tags:
 *       - Acciones
 *     summary: Agrega un nuevo juego
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fotos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "https://link-a-una-imagen.jpg"
 *               nombre:
 *                 type: string
 *                 example: "Placeholder"
 *               cantidad_de_jugadores:
 *                 type: string
 *                 example: "2 a 4 jugadores"
 *               tipo:
 *                 type: string
 *                 example: "Tablero"
 *               genero:
 *                 type: string
 *                 example: "Familiar"
 *               clasificacion_recomendada:
 *                 type: string
 *                 example: "10+ años"
 *               duracion_promedio:
 *                 type: string
 *                 example: "60 minutos"
 *               complejidad:
 *                 type: string
 *                 example: "Baja"
 *               habilidades:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "Estrategia"
 *                   - "Lexico"
 *                   - "Calculo"
 *     responses:
 *       '201':
 *         description: Juego agregado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Juego agregado exitosamente'
 *       '500':
 *         description: Error al agregar el juego
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Error al agregar el juego'
 */
app.post('/api/juegos', async (req, res) => {
    const { fotos, nombre, cantidad_de_jugadores, tipo, genero, clasificacion_recomendada, duracion_promedio, complejidad, habilidades } = req.body;

    try {
        const query = `
            INSERT INTO Juegos (fotos, nombre, cantidad_de_jugadores, tipo, genero, clasificacion_recomendada, duracion_promedio, complejidad, habilidades)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
        `;
        await client.query(query, [
            JSON.stringify(fotos),
            nombre,
            cantidad_de_jugadores,
            tipo,
            genero,
            clasificacion_recomendada,
            duracion_promedio,
            complejidad,
            JSON.stringify(habilidades)
        ]);

        res.status(201).json({ message: 'Juego agregado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el juego' });
    }
});

/**
 * @swagger
 * /api/juegos/{id}:
 *   put:
 *     tags:
 *       - Acciones
 *     summary: Actualiza un juego existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del juego a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fotos:
 *                 type: array
 *                 items:
 *                   type: string
 *               nombre:
 *                 type: string
 *               cantidad_de_jugadores:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               genero:
 *                 type: string
 *               clasificacion_recomendada:
 *                 type: string
 *               duracion_promedio:
 *                 type: string
 *               complejidad:
 *                 type: string
 *               habilidades:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Juego actualizado exitosamente
 *       500:
 *         description: Error al actualizar el juego
 */
app.put('/api/juegos/:id', async (req, res) => {
    const { id } = req.params;
    const { fotos, nombre, cantidad_de_jugadores, tipo, genero, clasificacion_recomendada, duracion_promedio, complejidad, habilidades } = req.body;

    try {
        const query = `
            UPDATE Juegos
            SET fotos = $1, nombre = $2, cantidad_de_jugadores = $3, tipo = $4,
                genero = $5, clasificacion_recomendada = $6, duracion_promedio = $7,
                complejidad = $8, habilidades = $9
            WHERE id = $10;
        `;
        await client.query(query, [
            JSON.stringify(fotos),
            nombre,
            cantidad_de_jugadores,
            tipo,
            genero,
            clasificacion_recomendada,
            duracion_promedio,
            complejidad,
            JSON.stringify(habilidades),
            id
        ]);
        res.json({ message: 'Juego actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el juego' });
    }
});

/**
 * @swagger
 * /api/juegos/{id}:
 *   delete:
 *     tags:
 *       - Acciones
 *     summary: Elimina un juego por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del juego a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Juego eliminado exitosamente
 *       404:
 *         description: Juego no encontrado
 *       500:
 *         description: Error al eliminar el juego
 */
app.delete('/api/juegos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM Juegos WHERE id = $1';
        const result = await client.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Juego no encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el juego" });
    }
});

app.listen(port, () => {
    console.log(`API de juegos de mesa corriendo en http://localhost:${port}`);
    console.log(`Documentación de la API en http://localhost:${port}/api-docs`);
});
