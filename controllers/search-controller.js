const { response } = require("express");
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const getSearch = async (req,res=response)=>{
    const search=req.params.search; 
    const regex = new RegExp(search, 'i'); 

    [users,doctors,hospital] = await Promise.all([
        User.find({name:regex}),
        Doctor.find({name:regex}),
        Hospital.find({name:regex})
    ]);
    res.json({
        ok:true,
        msg:'mensaje',
        users,
        doctors,
        hospital
    });
}

const getCollection = async (req,res=response)=>{
    const search=req.params.search;
    const table=req.params.table;
    let data = [];

    switch (table) {
        case 'doctors':
            data = await Doctor.find({name:regex});
            break;
        case 'hospitals':
            data = await Hospital.find({name:regex});
            break;
        case 'users':
            data = await User.find({name:regex});
            break;
        default:
            return res.status(400).json({
                ok:false,
                msg:'La tabla tiene pertenecer a la aplicación'
            });
            break;
        
            res.json({
                ok:true,
                result:data
            });
    }
    const regex = new RegExp(search, 'i'); 

    [users,doctors,hospital] = await Promise.all([
        User.find({name:regex}),
        Doctor.find({name:regex}),
        Hospital.find({name:regex})
    ]);
    res.json({
        ok:true,
        msg:'mensaje',
        users,
        doctors,
        hospital
    });
}

module.exports={
    getSearch,
    getCollection
}