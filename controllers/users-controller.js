const {res, response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');  
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req,resp)=>{
    const desde = Number(req.query.desde) || 0; 

   const [user, total]= await Promise.all([
        User.find({},'name email role google').skip(desde).limit(5),
        User.countDocuments()
   ]);
    resp.json({
        ok:true,
        user,
        uid:req.uid,
        total
    });
}

const createUsers = async (req,res)=>{
    const {email,password,name}= req.body;

    try { 
        const existEmail = await User.findOne({email});

        if(existEmail){
            return res.status(400).json({
                ok:false,
                msg:'Correo existente'
            })
        }

        const user= new User(req.body);
        //encriptar contraseña
        const salt= bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);
        //guardar usuario
        await user.save();

        const token = await generateJWT(user.id);

        res.json({
            ok:true,
            user,
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

const updateUsers = async (req,res=response)=>{
    //TODO: VALIDAR TOKEN DE USUARIO
    const uid=req.params.id; 
    try {
        const userBD = await User.findById(uid);
        if(!userBD){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no encontrado'
            });
        } 

        const { password, google, email, ...fields} = req.body;
        if(userBD.email !== email){ 
            const existEmail =await User.findOne({email});
            if(existEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese email'
                });
            }
        }
        //Actualizaciones
        if(!userBD.google){
            fields.email=email; 
        }
        const userUpdate = await User.findByIdAndUpdate(uid,fields,{new:true});

        res.json({
            ok:true,
            user:userUpdate
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado revisar logs'
        });
    }
}

const deleteUsers = async (req,res=response)=>{
    const uid=req.params.id; 
    try {
        const userBD= await User.findById(uid);

        if(!userBD){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no encontrado'
            });
        } 

        await User.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'Usuario borrado'
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
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers
}