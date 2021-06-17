const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("User", userSchema);

// Sign
router.post('/signup', async (req, res) => {
    try {
        const hashPass = await bcrypt.hash(req.body.password, 10);
        const newUser = await new User({
            name: req.body.name,
            username: req.body.username,
            password: hashPass,
        })
        await newUser.save();
        res.status(200).json({
            message: 'User signup was successful'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Signup was failed'
        })
    }
})

// login
router.post('/login', async (req, res) => {
    try {
        const validUser = await User.find({username: req.body.username});

        if (validUser && validUser.length > 0) {
            const matchPassword = await bcrypt.compare(req.body.password, validUser[0].password);
            if (matchPassword) {
                const token = jwt.sign({
                    username: validUser[0].username,
                    userId: validUser[0]._id,
                }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                })

                res.status(200).json({
                    jwtToken: token,
                    message: 'login successful'
                })
            } else {
                res.status(401).json({
                    error: 'Authentication failed!'
                })
            }
        } else {
            res.status(401).json({
                error: 'Authentication failed!'
            })
        }
    } catch {
        res.status(401).json({
            error: 'Authentication failed!'
        })
    }
})


module.exports = router;
