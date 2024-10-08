const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    if(tru){
      res.json({mensaje: 'Server Express respondiendo a peticion POST'})
    }
    else
    {
      next(err);
    }
    next(err);
});

app.post('/', (req, res) => {
  if(true){
    res.json({mensaje: 'Server Express contestando a peticion POST'})
  }
  else
  {
    next(err);
  }
  next(err);
});

app.listen(3000, () => {
    console.log('Server Express escuchando en puerto 3000');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.json({ error: "Ha ocurrido un error, favor de reportar", message: err.message });
});
