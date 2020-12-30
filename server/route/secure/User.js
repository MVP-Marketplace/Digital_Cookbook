const router = require('express').Router(),
jwt = require('jsonwebtoken');

router.get('/api/users/me', async (req, res)=>{

    return res.json(req.user)
})

router.patch('/api/users/me', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name','email','username']
    const isValidOperations = updates.every(update=>allowedUpdate.includes(update)
    )
    
    if(!isValidOperations){
        return res.status(400).send({error:'invalid update'})
    }

    try {
        updates.forEach(update => (req.user[update]=req.body[update]))
        await req.user.save()
        res.status(201).send(req.user)
    } catch (error) {
        res.status(400).send({error: error.toString()})
    }
})
router.post('/api/users/logout', async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter(token =>{
            return token.token !== req.token
        })
        await req.user.save()
        res.clearCookie('jwt')
        res.status(201).send({message: 'logged out'})
    } catch (error) {
        res.status(500).json({error: error.toString})
    }
} )
router.post('/api/users/logoutall', async (req, res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.clearCookie('jwt')
        res.status(200).json({message:'all devices logged out'})
    } catch (error) {
        res.status(500).json({error: error.toString})
    }
})
router.delete('/api/users/me', async (req, res)=>{
    try {
        await req.user.remove()
        res.clearCookie('jwt')
        res.status(200).json({message: 'user deleted'});

    } catch (error) {
    res.status(500).json({error: error.toString})        
    }
})
module.exports  = router