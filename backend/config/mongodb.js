import mongoose from "mongoose";
import dns from 'dns';

dns.setServers(['8.8.8.8']);
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("DB Connected");
        })

        await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
    } catch (error) {
        if (error.code === 'ECONNREFUSED' || error.syscall === 'querySrv') {
            throw new Error(
                'MongoDB Atlas DNS lookup failed. Check your internet/DNS settings or replace the SRV URI with a standard mongodb:// connection string.'
            );
        }

        throw error;
    }

}

export default connectDB;
