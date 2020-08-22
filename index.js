require('dotenv').config();
const express= require('express');
const { dbConnection } = require('./database/config');
const cors=require('cors');
//crear servidor express
const app=express();

//configurar cors
app.use(cors());
//base de datos

dbConnection();

//rutas
//user: user_nu1 
//pass: Btem7tSxY7tRIwLS
app.get('/',(req,resp)=>{
    resp.status(400).json({
        ok:true,
        msg:'hola mundo'
    })
})

app.listen(3000,()=>{
    console.log('Servidor corriendo en el puerto '+3000)
});