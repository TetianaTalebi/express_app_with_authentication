const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank!']
    },
    // Here will be saved a hashed password
    hashedPw: {
        type: String,
        required: [true, 'Password cannot be blank!']
    }
});