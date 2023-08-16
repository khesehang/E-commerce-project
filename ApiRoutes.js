const router = require('express').Router();

const AuthRoutes = require('./routes/AuthRoutes')
const UserRoutes = require('./routes/UserRoutes')

router.use('/auth', AuthRoutes)
router.use('/user', UserRoutes)

module.exports = router