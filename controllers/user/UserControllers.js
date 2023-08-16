const UserModel = require("../../models/userModel");

const getUserById = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) return res.status(404).json({
            message: 'User not found'
        })
        res.status(200).json(user)
    } catch (error) {
        return next(error);
    }
}
const updateUser = async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        if (!user) return res.status(404).json({
            message: 'User not found'
        })
        res.status(200).json(user)
    } catch (error) {
        return next(error);
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id, { new: true })
        if (!user) return res.status(404).json({
            message: 'User not found'
        })
        res.status(200).json('delete user successfully')
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getUserById,
    updateUser,
    deleteUser
}