import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import orderModel from './models/orderModel.js';

dotenv.config();

const fixOrders = async () => {
    try {
        await connectDB();
        
        console.log("Updating orders...");
        
        // Find all orders that are Delivered but still marked as Pending payment
        const result = await orderModel.updateMany(
            { status: "Delivered", payment: false },
            { payment: true }
        );
        
        console.log(`Successfully updated ${result.modifiedCount} orders.`);
        
        process.exit(0);
    } catch (error) {
        console.error("Error updating orders:", error);
        process.exit(1);
    }
}

fixOrders();
