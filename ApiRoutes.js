const router = require('express').Router();

const AuthRoutes = require('./routes/AuthRoutes')
const UserRoutes = require('./routes/UserRoutes')
const ProductRoutes = require('./routes/ProductRoutes')

router.use('/auth', AuthRoutes)
router.use('/user', UserRoutes)
router.use('/product', ProductRoutes)

module.exports = router