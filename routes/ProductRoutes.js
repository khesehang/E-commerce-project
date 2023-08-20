const { getProducts, postProduct, getProduct, updateProduct, deleteProduct, rateProduct, reviewProduct } = require('../controllers/products/ProductControllers');
const { verifyVendor, verifyUser } = require('../middleware/Authorization');

const router = require('express').Router();

router.get('/', verifyUser, getProducts)
router.post('/', verifyUser, verifyVendor, postProduct)
router.put('/rate/:id', verifyUser, rateProduct)
router.put('/review/:id', verifyUser, reviewProduct)
router.get('/:id', verifyUser, getProduct)
router.put('/:id', verifyUser, verifyVendor, updateProduct)
router.delete('/:id', verifyUser, verifyVendor, deleteProduct)

module.exports = router;