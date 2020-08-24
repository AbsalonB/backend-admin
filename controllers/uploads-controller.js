const path = require('path');
const { response } = require('express');
const { v4:uuid4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');
const fs = require('fs');

const fileUpload = (req, res = response) => {

    const type= req.params.type;
    const id=req.params.id;
    const validTypes = ['hospitals','doctors','users'];
   
    if(!validTypes.includes(type)){
        return res.status(400).json({
            ok:false,
            msg:'El tipo no es válido'
        });
    }
    //validar que exista un archivo
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok:false,
            msg:'No hay ningún archivo'
        });
    }

    //procesar la imagen
    const file = req.files.image;
    const splitName = file.name.split('.');
    const extensionFile = splitName[ splitName.length-1 ];

    //validar exensiones
    const validExtension=['png','jpg','jpeg','gif'];
    if(!validExtension.includes(extensionFile)){
        return res.status(400).json({
            ok:false,
            msg:'No es una extensión valida'
        });
    }

    //generar nombre del archivo
    const fileNameS = `${uuid4()}.${extensionFile}`;

    //path para guardar la imagen
    const path= `./uploads/${type}/${fileNameS}`;
    console.log(fileNameS);
    //mover la imagen 
    file.mv(path,(err)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                msg:'Sucedio un error al subir la imagen'
            });
        }

        //Actualizar base de datos
        updateImage(type,id,fileNameS);

        res.json({
            ok:true,
            msg:'Archivo Cargado',
            fileNameS
        })
    }); 
}

const getImageF = (req, res = response) => {
    const type = req.params.type;
    const photo = req.params.photo;

    const pathImg= path.join(__dirname, `../uploads/${type}/${photo}`);

    //

    if(fs.existsSync(pathImg)){
        res.sendFile( pathImg );
    }
    else{
        const pathImg= path.join(__dirname,'../uploads/no-img.jpg');
        res.sendFile(pathImg);
    }
}

module.exports={
    fileUpload,
    getImageF
}