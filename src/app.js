const express = require('express');
require ('dotenv').config();
const cors = require('cors');
const http = require('http');
const socket = require('./sockets/controller.js');
const { dbConnection } = require('./database/config.js');

const app = express();

//BASE DE DATOS
dbConnection();

// CORS
app.use(cors({
    origin: 'http://localhost:4200', // Dirección de tu frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


//DIRECTORIO PUBLICO
app.use( express.static('public') );

//LECTURA Y PARSEO DEL BODY
app.use( express.json() );

//RUTAS DE LA API
// rutas de los status
app.use(('/api/status'), require('./routes/status'));

// Crear servidor HTTP y WebSocket
const server = http.createServer(app);
socket.init(server);

module.exports = server;