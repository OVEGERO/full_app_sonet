const express = require('express');
require('dotenv').config();
const http = require('http');
const socketIO = require('socket.io');
const { dbConnection } = require('./database/config.js');
const Onu = require('./models/Onu.js');

const app = express();

// Database connection
dbConnection();

// Middlewares
app.use(express.static('public')); // Static files

// Route for other URLs
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// HTTP & WebSocket server
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost", // permitir solo localhost
        methods: ['GET'],
        credentials: true
    }
});

// Function to get Onu data and emit
const emitOnuData = (socket) => {
    Onu.find()
        .then(onus => socket.emit('onus', onus))
        .catch(console.error);
};

// Socket.IO
io.on('connection', socket => {
    // Emit initial data
    emitOnuData(socket);
    // Watch for changes in Onu collection
    Onu.watch().on('change', () => emitOnuData(io));
});

module.exports = server;
