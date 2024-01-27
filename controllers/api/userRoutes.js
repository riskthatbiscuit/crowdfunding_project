const router = require('express').Router();
const {User} = require('../../models');

router.post('/', async (req, res) => {
    
    console.log('we made it to the route')
    console.log(req.session)
    try {
    const newUser = await User.create(req.body);
    
    console.log(newUser)
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.status(200).json(newUser)
        })

    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/login', async (req, res) => {
    const userData = await User.findOne({
        where: {email: req.body.email}
    });
    console.log(userData)
    if (!userData) {
        res.status(400).json({message: 'Incorrect email or password, please try again'});
        return;
    };
    
    const validPassword = await userData.checkPassword(req.body.password);
    console.log(validPassword)
    try {

        if(!validPassword) {
            res.status(400).json({message: 'Incorrect email or password, please try again'})
            return;
        }

        console.log(userData)

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({user: userData, message: 'User logged in'})
        })


    } catch (err) {
        console.log('its broken')
        res.status(400).json(err);
    }
})

router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        });
    } else {
        res.status(404).end();
    }
})



module.exports = router;