const { getUserById, updateUser, deleteUser } = require('../controllers/user/UserControllers');
const { verifyUser } = require('../middleware/Authorization');

const router = require('express').Router();

router.get("/:id", verifyUser, getUserById)
router.put("/:id", verifyUser, updateUser)
router.delete("/:id", verifyUser, deleteUser)

module.exports = router