import express from 'express';
import { loginUser, registerUser, getProfile, updateProfile, addAddress, removeAddress, editAddress, addToWishlist, removeFromWishlist, getUserWishlist, googleLogin, getAllUsers, deleteUser, forgotPassword, resetPassword, updateUserStatus } from '../controllers/userController.js';
import upload from '../middleware/multer.js';
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/google-login', googleLogin);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);

userRouter.get('/profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/add-address', authUser, addAddress);
userRouter.post('/remove-address', authUser, removeAddress);
userRouter.post('/update-address', authUser, editAddress);

userRouter.post('/add-wishlist', authUser, addToWishlist);
userRouter.post('/remove-wishlist', authUser, removeFromWishlist);
userRouter.get('/wishlist', authUser, getUserWishlist);

// Admin routes
userRouter.get('/all', adminAuth, getAllUsers);
userRouter.post('/delete', adminAuth, deleteUser);
userRouter.post('/update-status', adminAuth, updateUserStatus);

export default userRouter;
