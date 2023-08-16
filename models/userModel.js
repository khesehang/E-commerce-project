const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname: {
        type: String, required: true
    },
    username: {
        type: String, required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'This email is already used!'],
        uniqueCaseInsensitive: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            },
            message: props => `${props.value} is not a valid email address}`
        }
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String,
        enum: ['user', 'vendor', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true,
})

const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel