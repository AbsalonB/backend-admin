const {Router}=require('express');  
const { getDoctors,createDoctor,updateDoctor,deleteDoctor } = require('../controllers/doctors-controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const {validateFields} = require('../middlewares/validate-fields');
const { check } = require('express-validator');

const router=Router();

router.get('/',getDoctors);

router.post('/',[
    validateJWT,
    check('name','El nombre del doctor es requerido'),
    check('hospital','El hospital debe ser válido').isMongoId(),
    validateFields
],createDoctor);

router.put('/:id',[
    validateJWT,
    check('name','El nombre del doctor es requerido').not().isEmpty(),
    check('hospital','El nombre del hospital es requerido').isMongoId()
],updateDoctor);

router.delete('/:id', deleteDoctor);

module.exports=router;