const JWT = require('jsonwebtoken'),
User = require('../models/users');

signToken = user => {
    return JWT.sign({
        _id: user._id.toString(), name: user.name
        }, process.env.JWT_SECRET,
        {expiresIn: '24h'})
};

module.exports = {
    signUp: async (req, res, next) => {
        const {userName,email, password} = req.value.body;

        let foundUser = await User.findOne({"local.email": email});
        if(foundUser) {
            return res.status(403).json({error: "Check login credentials"})
        }


        const newUser = new User({
            methods: ['local'],
            local: {
                userName: userName,
                email: email,
                password: password,
            }
        })


        await newUser.save();
        const token = signToken(newUser);
        res.cookie('access_token', token, {
            httpOnly: true
        })
        res.status(200).json({success: true});
    },

    signIn: async (req, res, next) => {
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.json({success:true});
    },

    signOut: async() => {
        res.clearCookie('access_token');
        res.json({ success: true });
    },

    googleOauth: async (req, res, next) =>{
        const token = signToken(req.user);
        res.cookie('access_token', token,{
            httpOnly: true
        })
        res.status(200).json({success: true})
    },
    facebookOauth: async (req, res, next) =>{
        const token = signToken(req.user);
        res.cookie('access_token', token,{
            httpOnly: true
        })
        res.status(200).json({success: true})
    }
} 