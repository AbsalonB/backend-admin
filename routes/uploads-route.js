const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, getImageF } = require('../controllers/uploads-controller');
const expressFileUpload = require('express-fileupload');

const router = Router();

router.use(expressFileUpload());
router.put('/:type/:id',validateJWT,fileUpload); 
router.get('/:type/:photo',getImageF); 


module.exports=router;