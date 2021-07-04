const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route     GET api/users
// @desc      Test route
// @acsses    Public --> auth - token

router.get('/', (req, res) => res.send('Users Route ..!'));

// @route     PODST api/users
// @desc      Register route
// @acsses    Public
router.post(
    '/',
    [
        check('name', 'Name is required!').not().isEmpty(),
        check('email', 'You should include a VALID email Please!').isEmail(),
        check(
            'password',
            'Please Enter a Password of 8 or more characters!'
        ).isLength({
            min: 6,
        }),
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
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already Exists' }] });
            }
            // get users gravatar

            const avatar = gravatar.url(email, {
                s: '200', //default size
                r: 'pg', //
                d: 'mm' //default image
            })

            user = new User({
                name,
                email,
                avatar,
                password
            });


            // encrypt password

            const salt = await bcrypt.genSalt(10);          // 10 is recommended in DOC
            //hash password
            user.password = await bcrypt.hash(password, salt);
            // use await with any thing that returns promise
            // .save to DB

            await user.save();


            // return jsonwebtoken  JWT

            const payload = {
                user: {
                    id: user.id   // mongo DB _id --- mongoose id 
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 },       //optional
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            );



            // res.send('Users Registered ..!');

        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server ERROR!');
        }




    }
);

module.exports = router;
