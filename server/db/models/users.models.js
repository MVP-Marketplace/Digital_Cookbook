const mongoose = require('mongoose'),
jwt = require('jsonwebtoken'),
validator = require('validator'),
bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) throw new Error('Email is invalid');
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
}, 
{
    timestamp: true
})

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        {_id: user._id.toString(), name: user.name},
        process.env.JWT_SECRET,
        { expiresIn :'24h'}
    );
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 8);

    next();
})

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({email});
    if(!user) throw new Error('Unable to login');
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Unable to login');
    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;