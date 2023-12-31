const express = require('express');
// Config para utilizar .env
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


// Crear servidor de espress
const app = express();

// Base de Datos
dbConnection();

// Coors
app.use( cors() );

// Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// para error de 404
app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html');
})

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Server online ${ process.env.PORT }`);
});