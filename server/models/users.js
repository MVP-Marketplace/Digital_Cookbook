const mongoose = require('mongoose'),
bcrypt = require('bcryptjs'),
Schema = mongoose.Schema;

const userSchema = new Schema({
    methods: {
        type: [String],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: String,
        userName: String,
       
    },
    tokens: [
        {
            token: mongoose.Types.ObjectId
        }
    ],
    google: {
        id:{
            type: String,
        },
        email:{
            type: String,
            lowercase: true
        },
        name:{
            type: String
        }
    },
    facebook: {
        id:{
            type: String,
        },
        email:{
            type: String,
            lowercase: true
        },
        name:{
            type: String
        }
    }
})

userSchema.pre('save', async function (next) {
    try {
        if(!this.methods.includes('local')) next();

        if(!this.isModified('local.password')) next();

        this.local.password = await bcrypt.hash(this.local.password, 8);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.statics.findByCredentials = async function (email, password) {
    try {
        const user = await User.findOne({"local.email": email})
        if(!user) throw new Error("Unable to log in.")
        if(bcrypt.compare(password, user.local.password)) {
            return user;
        } else {
            throw new Error("Unable to log ing")
        }
    } catch (error) {
        throw new Error(error)
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;