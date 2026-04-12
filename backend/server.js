import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import adminRouter from './routes/adminRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
// import couponRouter from './routes/couponRoute.js';
import reviewRouter from './routes/reviewRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/admin', adminRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
// app.use('/api/coupon', couponRouter);
app.use('/api/reviews', reviewRouter);
app.get('/', (req, res) => {
    res.send("API Working");
});

// Start Server
const startServer = async () => {
    try {
        await connectDB();
        await connectCloudinary();

        app.listen(port, () => console.log('Server started on PORT : ' + port));
    } catch (error) {
        console.error('Backend startup failed:', error.message);
        process.exit(1);
    }
}

startServer();
