import User from "../model/UserModel.js";
import asyncHandler from "../middleware/AsyncHandler.js";
import { Error } from "mongoose";
import generateToken from '../utils/createToken.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';


const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();

        generateToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        });
    } catch (error) {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password)
        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        if (isPasswordValid) {
            generateToken(res, user._id)

            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,

            })
        }

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});



const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    res.json({ message: 'Logged out successfully' });
});


const getAllUser = asyncHandler(async (req, res) => {
    const user = await User.find({});
    res.json(user)
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.User._id)

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
const updateCurrentProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error('Cannot delete an admin')
        }
        await user.deleteOne({ _id: user._id })
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin)
        const updatedUser = await user.save();


        res.json({
            _id: updatedUser._id,
            username: updatedUser._username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })

    } else {
        res.status(404)
        throw new Error("User not found")
    }
})
export { createUser, loginUser, logoutCurrentUser, getAllUser, getCurrentUserProfile, updateCurrentProfile, deleteUserById, getUserById, updateUserById };