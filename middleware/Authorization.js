const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')

const verifyUser = async (req, res, next) => {
    try {
        let token;
        const headerToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token'];
        const queryToken = req.query.token
        token = headerToken || queryToken;
        if (!token) {
            return next({
                message: "Token not provided, Authorization failed!",
                stauts: 401,
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const User = await UserModel.findById(decoded._id).select('-password')
        if (!User) {
            return res.status(404).json({ message: "User not found" })
        }
        req.user = User
        next()
    } catch (error) {
        next(error)
    }
}

const verifyVendor = async (req, res, next) => {
    if (req.user.id === req.params.id || req.user.role === 'vendor') {
        console.log('hello vendor')
        next()
    } else {
        return res.status(401).json({ message: "You are not a vendor so, you are not authorized to perform this action" })
    }
}

module.exports = {
    verifyUser,
    verifyVendor,
}