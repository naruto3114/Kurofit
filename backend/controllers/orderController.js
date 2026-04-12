import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import razorpay from 'razorpay'

// Razorpay Instance
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Decrement product quantities
        for (const item of items) {
            const product = await productModel.findById(item._id);
            if (product) {
                const newQuantity = Math.max(0, product.quantity - item.quantity);
                product.quantity = newQuantity;
                product.inStock = newQuantity > 0;
                await product.save();
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error.message })
            }
            res.json({ success: true, order })
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Verify Razorpay Payment
const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            
            // Decrement product quantities
            const order = await orderModel.findById(orderInfo.receipt);
            for (const item of order.items) {
                const product = await productModel.findById(item._id);
                if (product) {
                    const newQuantity = Math.max(0, product.quantity - item.quantity);
                    product.quantity = newQuantity;
                    product.inStock = newQuantity > 0;
                    await product.save();
                }
            }
            
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: "Payment Failed" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// User Order Data For Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        const updateData = { status };
        
        // If order is delivered, it should be marked as paid and set delivery date
        if (status === "Delivered") {
            updateData.payment = true;
            updateData.deliveredDate = Date.now();
        }

        await orderModel.findByIdAndUpdate(orderId, updateData)
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// cancel order from User Panel
const cancelOrder = async (req, res) => {
    try {
        const { orderId, userId } = req.body;
        
        const order = await orderModel.findById(orderId);
        
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }
        
        if (order.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized" });
        }
        
        if (order.status !== "Order Placed" && order.status !== "Packing") {
            return res.json({ success: false, message: "Order cannot be cancelled at this stage" });
        }

        // Update status
        await orderModel.findByIdAndUpdate(orderId, { status: "Cancelled" });

        // Restore product quantities
        for (const item of order.items) {
            const product = await productModel.findById(item._id);
            if (product) {
                product.quantity += item.quantity;
                product.inStock = true; // Always true if we just added stock back
                await product.save();
            }
        }

        res.json({ success: true, message: "Order Cancelled Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// request return from User Panel
const requestReturn = async (req, res) => {
    try {
        const { orderId, userId, reason } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        if (order.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        if (order.status !== "Delivered") {
            return res.json({ success: false, message: "Only delivered orders can be returned" });
        }

        // Check if delivered within 7 days
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        const deliveryTime = order.deliveredDate || order.date; // fallback to order date for old orders
        
        if (Date.now() - deliveryTime > sevenDays) {
            return res.json({ success: false, message: "Return window has expired (7 days policy)" });
        }

        // Update status to return requested
        await orderModel.findByIdAndUpdate(orderId, { 
            status: "Return Requested",
            returnReason: reason,
            returnStatus: "Requested"
        });

        res.json({ success: true, message: "Return Requested Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// update payment status from Admin Panel
const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId, payment } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { payment });
        res.json({ success: true, message: 'Payment Status Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { 
    placeOrder, 
    placeOrderRazorpay, 
    verifyRazorpay, 
    allOrders, 
    userOrders, 
    updateStatus, 
    cancelOrder, 
    requestReturn,
    updatePaymentStatus 
}
