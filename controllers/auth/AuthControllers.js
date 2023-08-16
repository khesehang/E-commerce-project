const UserModel = require("../../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Register = async (req, res, next) => {
    try {
        const saltRounds = 10;

        // Generate a salt synchronously
        const salt = bcrypt.genSaltSync(saltRounds);

        // Hash the password using the generated salt synchronously
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        // Create a new user with the hashed password
        const newUser = await UserModel.create({
            ...req.body,
            password: hashPassword
        });

        res.status(201).json(newUser); // Send a response if user creation is successful
    } catch (error) {
        return next(error);
    }
};

const Login = async (req, res, next) => {
    try {
        const newData = await UserModel.findOne({
            $or: [
                { email: req.body.username },
                { username: req.body.username },
            ]
        })
            .exec()
        if (!newData) {
            return next({ message: "User not found!" })
        }

        const isMatched = await bcrypt.compare(req.body.password, newData.password)
        if (!isMatched) {
            return res.json({
                message: "email or password is incorrect!"
            })
        }

        const token = generateToken(newData._id)
        res.status(200).json({
            user: {
                _id: newData._id,
                username: newData.username,
                email: newData.email
            },
            token
        })
    } catch (error) {
        console.log(error)
        return next(error)
    }
}

function generateToken(userId) {
    const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return token;
}

module.exports = {
    Register,
    Login
}
