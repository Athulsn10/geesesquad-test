const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const { response } = require('express');
const generateToken = require('../config/generateToken');

// user registration
const registerUser = asyncHandler(async (req, res) => {
    console.log("reached user controller", req.body);
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        res.status(400);
        throw new Error('Please Enter All Fields');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        throw new Error('Failed to create user');
    }
});

// user authentication
const authUser = asyncHandler(async (req, res) => {
    console.log("reached user controller auth user", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

module.exports = { registerUser, authUser };
