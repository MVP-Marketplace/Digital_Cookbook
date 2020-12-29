const router = require('express').Router(),
jwt = require('jsonwebtoken'),
User = require('../../db/models/users.models');

router.post('/api/users', async (req, res) => {
    const { email, name, username, password } = req.body;
    let user = await User.findOne({email});
    if(user) throw new Error('An account with this email already exists');
    try {
        user = new User({
            name,
            email,
            username,
            password,
        })

        const token = await user.generateAuthToken();
        res.cookie('jwt', token, {
            httpOnly:true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'production' ? false : true
        })
        res.status(201).json(user);
    } catch (error) {
        res.status(401).json({error: error.toString()})
    }
})

router.post('/api/users/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'production' ? false : true
        })
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.toString()});
    }
})

module.exports = router;