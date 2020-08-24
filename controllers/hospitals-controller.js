const {response} = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async (req,res=response)=>{
    const hospital = await Hospital.find().populate('user','name email');
    res.json({
        ok:true,
        hospital
    })
}

const createHospital = async (req,res=response)=>{
    const uid=req.uid;
    const hospital=new Hospital({user:uid, ...req.body}); 
    try {
        const hospitalDB= await hospital.save();
        res.json({
            ok:true,
            hospitalDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado revisar logs'
        });
    }
}


const updateHospital = (req,res=response)=>{
    res.json({
        ok:true,
        msg:'updateHospital'
    })
}


const deleteHospital = (req,res=response)=>{
    res.json({
        ok:true,
        msg:'deleteHospital'
    })
}

module.exports={
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}