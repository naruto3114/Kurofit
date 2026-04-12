import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary'
import { OAuth2Client } from 'google-auth-library'
import crypto from 'crypto'
import { mailtrapClient, mailtrapSender } from "../config/mailtrap.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// Route for user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for getting cloudinary public id from url
const getPublicId = (url) => {
    return url.split('/').pop().split('.')[0];
}

// Route to update user profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, dob, gender } = req.body
        const imageFile = req.file

        if (!name) {
            return res.json({ success: false, message: "Name is required" })
        }

        const user = await userModel.findById(userId);

        await userModel.findByIdAndUpdate(userId, { name, phone, dob, gender })

        if (imageFile) {
            // Delete old image if it exists
            if (user.image && user.image.includes('cloudinary')) {
                const oldPublicId = getPublicId(user.image);
                await cloudinary.uploader.destroy(oldPublicId).catch(err => console.log("Cloudinary Delete Error:", err));
            }

            // Upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// Route to add address
const addAddress = async (req, res) => {
    try {
        const { userId, address } = req.body
        const user = await userModel.findById(userId)
        const addresses = user.addresses
        addresses.push(address)
        await userModel.findByIdAndUpdate(userId, { addresses })
        res.json({ success: true, message: "Address Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Route to remove address
const removeAddress = async (req, res) => {
    try {
        const { userId, index } = req.body
        const user = await userModel.findById(userId)
        const addresses = user.addresses
        addresses.splice(index, 1) // Remove by index
        await userModel.findByIdAndUpdate(userId, { addresses })
        res.json({ success: true, message: "Address Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Route to edit address
const editAddress = async (req, res) => {
    try {
        const { userId, index, address } = req.body
        const user = await userModel.findById(userId)
        const addresses = user.addresses
        addresses[index] = address
        await userModel.findByIdAndUpdate(userId, { addresses })
        res.json({ success: true, message: "Address Updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Route to add to wishlist
const addToWishlist = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const user = await userModel.findById(userId);
        const wishlist = user.wishlist || [];

        if (!wishlist.includes(itemId)) {
            wishlist.push(itemId);
            await userModel.findByIdAndUpdate(userId, { wishlist });
            res.json({ success: true, message: "Added to Wishlist" });
        } else {
            res.json({ success: false, message: "Already in Wishlist" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route to remove from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const user = await userModel.findById(userId);
        let wishlist = user.wishlist || [];

        if (wishlist.includes(itemId)) {
            wishlist = wishlist.filter(id => id !== itemId);
            await userModel.findByIdAndUpdate(userId, { wishlist });
            res.json({ success: true, message: "Removed from Wishlist" });
        } else {
            res.json({ success: false, message: "Item not in Wishlist" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route to get wishlist
const getUserWishlist = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        res.json({ success: true, wishlistData: user.wishlist || [] });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for Google Login
const googleLogin = async (req, res) => {
    try {
        const { token: googleToken, credential, is_access_token } = req.body;
        const inputToken = googleToken || credential;

        if (!inputToken) {
            return res.json({ success: false, message: "Token is required" });
        }

        let userData;

        if (is_access_token) {
            // Verify access token by calling Google's UserInfo API
            const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${inputToken}`);
            userData = await response.json();
            
            if (!userData.email) {
                return res.json({ success: false, message: "Invalid Access Token or expired" });
            }
        } else {
            // Verify ID Token (standard component flow)
            const ticket = await client.verifyIdToken({
                idToken: inputToken,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            userData = ticket.getPayload();
        }

        const { name, email, picture } = userData;

        let user = await userModel.findOne({ email });

        if (!user) {
            // Create user if not exists
            const tempPassword = Math.random().toString(36).slice(-10); // Random temp password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(tempPassword, salt);

            user = new userModel({
                name,
                email,
                password: hashedPassword,
                image: picture
            });
            await user.save();
        }

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route to get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).select('-password');
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route to delete user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;
        await userModel.findByIdAndDelete(userId);
        res.json({ success: true, message: "User Deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for forgot password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash and save token to user
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        // Create reset URL
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a click on the following link to complete the process:\n\n ${resetUrl} \n\n If you did not request this, please ignore this email and your password will remain unchanged.`;

        try {
            await mailtrapClient.send({
                from: mailtrapSender,
                to: [{ email: user.email }],
                subject: 'Password Reset Request',
                text: message,
                category: "Password Reset",
            });

            res.json({ success: true, message: "Email sent" });
        } catch (error) {
            console.log(error);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            res.json({ success: false, message: "Email could not be sent" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for reset password
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.json({ success: false, message: "Invalid or expired token" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.json({ success: true, message: "Password reset successful" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route to update user status (Active/Inactive)
const updateUserStatus = async (req, res) => {
    try {
        const { userId, status } = req.body;
        await userModel.findByIdAndUpdate(userId, { status });
        res.json({ success: true, message: "User Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { loginUser, registerUser, getProfile, updateProfile, addAddress, removeAddress, editAddress, addToWishlist, removeFromWishlist, getUserWishlist, googleLogin, getAllUsers, deleteUser, forgotPassword, resetPassword, updateUserStatus }
