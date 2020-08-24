require('dotenv').config();
const express= require('express');
const { dbConnection } = require('./database/config');
const cors=require('cors'); 
//crear servidor express
const app=express();

//configurar cors
app.use(cors());
//lectura y parseo del body
app.use(express.json());
//base de datos

dbConnection();

//rutas 
app.use('/api/users', require('./routes/users-route'));
app.use('/api/login', require('./routes/auth-route'));
app.use('/api/hospitals', require('./routes/hospitals-route'));
app.use('/api/doctors', require('./routes/doctors-route'));
app.use('/api/todo', require('./routes/search-route'));
app.use('/api/upload', require('./routes/uploads-route'));

app.listen(3000,()=>{
    console.log('Servidor corriendo en el puerto '+3000)
});