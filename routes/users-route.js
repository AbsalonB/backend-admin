const {Router}=require('express');
const {check}=require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');
const { getUsers, createUsers, updateUsers, deleteUsers } =require('../controllers/users-controller');
const { validateJWT, validateAdminRole, validateAdminRole_or_SameUser } = require('../middlewares/validate-jwt');
const router=Router();

router.get('/',validateJWT,getUsers);

router.post('/',[
    //validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail().not(),
    check('password','La contraeña es obligatoria').not().isEmpty(),
    validateFields, 
],createUsers);

router.put('/:id',[
    validateJWT,
    validateAdminRole_or_SameUser,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail().not(),
    check('role','El rol es obligatorio').not().isEmpty(),
    validateFields, 
],updateUsers);

router.delete('/:id', [validateJWT, validateAdminRole], deleteUsers);

module.exports=router;