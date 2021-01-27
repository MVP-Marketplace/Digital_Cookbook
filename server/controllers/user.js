const JWT = require('jsonwebtoken'),
User = require('../models/users');

singToken = user => {
    return JWT.sign({
        _id: user._id.toString(), name: user.name
        }, process.env.JWT_SECRET,
        {expiresIn: '24h'})
};

module.exports = {
    signUp: async (req, res, next) => {
        const {email, password} = req.value.body;
        
        let foundUser = await User.findOne({"local.email": email});
        if(foundUser) {
            return res.status(403).json({error: "Check login credentials"})
        }
        
        const newUser = new User({
            methods: ['local'],
            local: {
                email: email,
                password: password
            }
        })
        await newUser.save();
        const token = singToken(newUser);
        res.cookie('access_token', token, {
            httpOnly: true
        })
        res.status(200).json({success: true});
    },

    signIn: async (req, res, next) => {
        const token = singToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.json({success:true});
    },

    signOut: async(req, res, next) => {
        res.clearCookie('access_token');
        res.json({ success: true });
    }
}