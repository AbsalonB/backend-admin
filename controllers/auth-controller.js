const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs/dist/bcrypt'); 
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignIn = async(req,resp = response)=>{
    const googleToken = req.body.token;
    try {
        const {name,email,picture} = await googleVerify(googleToken);
        const userDB = await User.findOne({email});
        let user;
        if(!userDB){
            user = new User({
                name,
                email,
                password:'@@@',
                img:picture,
                google:true
            });
        } else {
            user = userDB;
            user.google = true;     
            user.password = '@@@';
        }

        await user.save();

        const token = await generateJWT(userDB.id);

        resp.json({
            ok:true,
            token
        }); 
    } catch (error) {
        resp.json({
            ok:false,
            msg:'Token no es correcto'
        }); 
    }
}

module.exports = {
    login,
    googleSignIn
}