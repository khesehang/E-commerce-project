const { Login, Register } = require('../controllers/auth/AuthControllers');

const router = require('express').Router();

router.post("/login",Login)
router.post("/register",Register)

module.exports = router