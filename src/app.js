const express = require('express');
require ('dotenv').config();
const cors = require('cors');

const app = express();

// CORS
app.use(cors());

//DIRECTORIO PUBLICO
app.use( express.static('public') );

//LECTURA Y PARSEO DEL BODY
app.use( express.json() );

//RUTAS DE LA API
// rutas de los status
app.use(('/api/status'), require('./routes/status'));

//ruta para otras URL
app.get('*', (req, res) => {
    res.sendFile(  __dirname + '/public/index.html' );
});

module.exports = app;