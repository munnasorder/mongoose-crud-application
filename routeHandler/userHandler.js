const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("User", userSchema);

// Sign up user
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


module.exports = router;
