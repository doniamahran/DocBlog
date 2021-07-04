const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route     GET api/profile
// @desc      Get all profiles
// @acsses    Public --> auth - token

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route     GET api/profile/user/:user_id
// @desc      Get profile by user id
// @acsses    Public --> auth - token

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile)
            return res.status(400).json({ msg: 'Profile Not Found' })

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId')
            return res.status(400).json({ msg: 'Profile Not Found' })

        res.status(500).send('Server Error');
    }
});


// @route     GET api/profile/me
// @desc      get cuurent users profile
// @acsses    private

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await (
            await Profile.findOne({ user: req.user.id })
        ).populated('user', 'name', 'avatar');

        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile exists fot this user' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/profile
// @desc      create / update users profile
// @acsses    private

router.post(
    '/',
    [
        auth,
        [
            check('specialization', 'Specialization is Reuired').not().isEmpty(),
            check('location', 'Location is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { specialization, hospital, location, certificate, facebook, twitter, youtube } = req.body;


        //build Profile Object

        const profileFields = {};
        profileFields.user = req.user.id;

        if (specialization)
            profileFields.specialization = specialization;

        if (hospital)
            profileFields.hospital = hospital;

        if (location)
            profileFields.location = location;

        if (certificate)
            profileFields.certificate = certificate;

        profileFields.social = {}
        //.split(',').map(social => social.trim());
        if (facebook) {
            profileFields.social.facebook = facebook;
        }
        if (twitter) {
            profileFields.social.twitter = twitter;
        } if (youtube) {
            profileFields.social.youtube = youtube;
        }

        try {
            let profile = await Profile.findOne({ user: req.user.id })

            if (profile) {
                //Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true });
                return res.json(profile);
            }
            //Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }

        console.log(profileFields.social);

        res.send('hi')
    }
);


// @route     DELETE api/profile
// @desc      Delete profile, user & posts
// @acsses    Private

router.delete('/', auth, async (req, res) => {
    try {
        //Remove Profile 
        await Profile.findOneAndRemove({ users: req.user.id });
        //Remove User 
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @route     PUT api/profile/certificate
// @desc      Add Profile Certificate 
// @acsses    Private

// router.put('/certificate', auth, auth(req,res) => { 

// })




module.exports = router;
