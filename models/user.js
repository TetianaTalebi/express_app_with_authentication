const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// In order to refactor the app, the validation code is moved from the route handlers into
// 'statics' methods of userSchema
userSchema.statics.findAndValidate = async function(username, password){
    const foundUser = await this.findOne({username});

    // This expression returns 'true' or 'false'
    // So, isValid will be equal to 'true' or 'false'
    const isValid = await bcrypt.compare(password, foundUser.hashedPw);

    return isValid ? foundUser : false;
};


// Create a User Model and export it
module.exports = mongoose.model('User', userSchema);