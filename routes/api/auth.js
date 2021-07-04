const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route     GET api/auth
// @desc      Test route
// @acsses    Public --> auth - token

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).send('Server ERROR');
    }
}
    //res.send('auth Route ..!')
);


// @route     PODST api/auth
// @desc      Authenticate user route and get Token
// @acsses    Public
router.post(
    '/',
    [
        check('email', 'You should include a VALID email Please!').isEmail(),
        check(
            'password',
            'Password is Required'
        ).exists()
    ],
    async (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {

            // is exist
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'User Doesn`t Exists ... invalid credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            // return jsonwebtoken  JWT

            const payload = {
                user: {
                    id: user.id   // mongo DB _id --- mongoose id 
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },       //optional
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            );

        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server ERROR!');
        }




    }
);


module.exports = router;