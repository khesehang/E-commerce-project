const router = require('express').Router();

const AuthRoutes = require('./routes/AuthRoutes')

router.use('/auth', AuthRoutes)

module.exports = router