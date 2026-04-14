import 'dotenv/config';
import mongoose from 'mongoose';

const cleanupSubcategory = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("MONGODB_URI is not defined in .env");
            process.exit(1);
        }

        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

        // Use a generic collection access to avoid model dependency issues during script execution
        const Product = mongoose.connection.collection('products');

        // Search for both "trackpant" and any likely typos like "trackpnat"
        const filter = {
            subcategory: { $in: ["trackpant", "trackpnat", "Trackpant", "Trackpnat", "Trackpants", "trackpants"] }
        };

        const updateDoc = {
            $set: { subcategory: "jogger" }
        };

        const results = await Product.updateMany(filter, updateDoc);
        
        console.log(`Matched ${results.matchedCount} products.`);
        console.log(`Modified ${results.modifiedCount} products to subcategory: "jogger".`);

        console.log("Cleanup complete!");
    } catch (error) {
        console.error("Cleanup failed:", error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

cleanupSubcategory();
