const { getUserById, updateUser, deleteUser } = require('../controllers/user/UserControllers');

const router = require('express').Router();

router.get("/:id", getUserById)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router