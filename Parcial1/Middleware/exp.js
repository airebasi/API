//Esta carpeta va para unidad 1
const express = require('express');
const app = express();
//const cors = require('cors');
//app.use(cors()) //Middleware de terceros (ya que es importada)
//Middleware de aplicacion
app.use((req,res,next)=>{
    console.log(new Date());
    //next();
})

//Se puede especificar si se requiere pasar por cors antes con la funcion antes mencionada
app.get('/', (req, res) => {
    res.send('Server Express contestando a peticion GET');
});

//Se puede agregar cors() despues de la coma

//app.use es una funcion middleware

//Una funcion middleware integrado en express seria el siguiente
app.use(express.json());


app.post('/', (req, res) => {
    res.send('Server Express contestando a peticion POST');
    //Por si sale un error
    //next(error);
    //Tambien se puede intentar con un try-catch
});

app.listen(3000, () => {
    console.log('Server Express escuchando en puerto 3000');
});

//middleware de manejo de errores, va hasta el fondo (usualmente)
//Esto es usualmente necesario para que no se caiga el servidor
app.use(function(err,req,res,next) {
  res.status(500).send("Algo ha fallado");  
})