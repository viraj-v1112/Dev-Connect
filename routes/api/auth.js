const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

// @route   GET api/auth
// @desc    Test
// @access  Public
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        return res.json(user);
    } catch(err) {
        console.error(err.message);
        return res.status(500).send("Server Error")
    }
});

// @route   Post api/auth
// @desc    Authenticate and get token from user
// @access  Public
router.post(
    '/',
    [
        check('email', 'Please enter a valid Email Address').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors : errors.array() })
        }

        const { email, password } = req.body

        try{

            // Check if user exists
            let user = await User.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
            }

            // Checking the password
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
            }

            // Generating the web token based on the user id
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token: token })
                }
            );

        } catch(err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }

    }
)

module.exports = router