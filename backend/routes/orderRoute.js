import express from 'express'
import { placeOrder, placeOrderRazorpay, verifyRazorpay, allOrders, userOrders, updateStatus, cancelOrder, updatePaymentStatus, requestReturn } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)
orderRouter.post('/payment-status', adminAuth, updatePaymentStatus)

// User Features
orderRouter.post('/userorders', authUser, userOrders)
orderRouter.post('/cancel', authUser, cancelOrder)
orderRouter.post('/return', authUser, requestReturn)

export default orderRouter
