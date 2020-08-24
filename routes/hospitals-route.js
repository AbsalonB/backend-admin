const {Router}=require('express');  
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals-controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');
const router=Router();

router.get('/',getHospitals);

router.post('/',[
    validateJWT,
    check('name','El nombre del hospital es requerido'),
    validateFields,
],createHospital);

router.put('/:id',[],updateHospital);

router.delete('/:id', deleteHospital);

module.exports=router;