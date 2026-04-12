import express from 'express';
import { generateCoupon, verifyCoupon, getCoupons, deleteCoupon } from '../controllers/couponController.js';
import adminAuth from '../middleware/adminAuth.js';

const couponRouter = express.Router();

couponRouter.post('/generate', adminAuth, generateCoupon);
couponRouter.post('/verify', verifyCoupon);
couponRouter.get('/list', adminAuth, getCoupons);
couponRouter.post('/delete', adminAuth, deleteCoupon);

export default couponRouter;
