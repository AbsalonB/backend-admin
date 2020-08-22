const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs/dist/bcrypt'); 
const { generateJWT } = require('../helpers/jwt');


const login= async (req,res=response)=>{
    const {email, password}=req.body;
    try {
        const usuarioBD =  await User.findOne({email});
        if(!usuarioBD){
            return res.status(404).json({
                ok:false,
                msg:'Correo o contraseña no válida'
            })
        }

        //verificar contraseña
        const validPassword= bcrypt.compareSync( password, usuarioBD.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Contraseña o correo no válido'
            });
        }

        //generar token
        const token = await generateJWT(usuarioBD.id);
        res.json({
            ok:true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado revisar logs'
        });
    }
}

module.exports = {
    login
}