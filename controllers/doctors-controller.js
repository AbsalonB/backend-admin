const {response} = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async (req,res=response)=>{
    const doctors= await Doctor.find().populate('user','name email').populate('hospital','name');
    res.json({
        ok:true,
        doctors
    })
}

const createDoctor = async (req,res=response)=>{
    const uid=req.uid;
    const doctor = new Doctor({
        user: uid,
        ...req.body
    });
    try {
        const doctorBD = await doctor.save();
        res.json({
            ok:true,
            doctor: doctorBD 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado revisar logs'
        });
    }
}


const updateDoctor = async (req,res=response)=>{
    const id = req.params.id;
    const uid = req.uid;
    try {

        const doctor = await Doctor.findById(id);
        if(!doctor){
            return res.status(404).json({
                ok:true,
                msg:'Medico no encontrado' 
            }) ; 
        }
        const   doctorChanges = { 
            ...req.body,
            user:uid
        };

        const doctorUpdated = await Doctor.findByIdAndUpdate(id, doctorChanges,{new:true});
        //hospital.name = req.body.name;
        res.json({
            ok:true, 
            doctor: doctorUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    } 
}


const deleteDoctor = (req,res=response)=>{
    const id = req.params.id; 
    try {

        const doctor = await Doctor.findById(id);
        if(!doctor){
            return res.status(404).json({
                ok:true,
                msg:'Medico no encontrado' 
            }) ; 
        }

        await Doctor.findByIdAndDelete( id );
        
        res.json({
            ok:true, 
            msg:'Medico borrado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    } 
}

module.exports={
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}