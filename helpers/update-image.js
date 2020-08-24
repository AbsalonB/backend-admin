const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const fs = require('fs');

const deleteImage = (path) =>{ 
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}

const updateImage= async (type,id,fileNameS)=>{
    let oldPath='';
    switch (type) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if(!doctor){
                console.log('No se encontró el médico');
                return false;
            }
            oldPath= `./uploads/doctors/${doctor.img}`;
            deleteImage(oldPath); 

            doctor.img = fileNameS;
            await doctor.save();
            return true
            break;
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('No se encontró el hospital');
                return false;
            }
            oldPath= `./uploads/hospitals/${hospital.img}`;
            deleteImage(oldPath); 
            
            hospital.img = fileNameS;
            await hospital.save();
            return true
            break;
        case 'users':
            const user = await User.findById(id);
            if(!user){
                console.log('No se encontró el usuario');
                return false;
            }
            oldPath= `./uploads/users/${user.img}`;
            deleteImage(oldPath); 
            
            user.img = fileNameS;
            await user.save();
            return true
            break;
        default:
            break;
    }
}

module.exports={
    updateImage
}