const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getSearch, getCollection } = require('../controllers/search-controller');
const router = Router();

router.get('/:search',validateJWT,getSearch);
router.get('/collection/:table/:search',validateJWT,getCollection);


module.exports=router;