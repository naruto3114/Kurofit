import reviewModel from "../models/reviewModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

// API to add a new review
const addReview = async (req, res) => {
    try {
        const { userId, productId, rating, comment } = req.body;

        // 1. Verify that the user has a 'Delivered' order for this product
        const orders = await orderModel.find({ userId, status: 'Delivered' });
        
        // Check if any of these delivered orders contains the productId
        const hasPurchased = orders.some(order => 
            order.items.some(item => item._id === productId)
        );

        if (!hasPurchased) {
            return res.json({ success: false, message: "You can only review products that have been delivered to you." });
        }

        // 2. Check if the user has already reviewed this product
        const existingReview = await reviewModel.findOne({ userId, productId });
        if (existingReview) {
            return res.json({ success: false, message: "You have already reviewed this product." });
        }

        // 3. Get the user's name
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // 4. Create and save the new review
        const reviewData = {
            productId,
            userId,
            name: user.name,
            rating: Number(rating),
            comment,
            date: Date.now()
        };

        const newReview = new reviewModel(reviewData);
        await newReview.save();

        // 5. Recalculate the Product's Average Rating
        const allReviews = await reviewModel.find({ productId });
        
        const totalReviews = allReviews.length;
        const sumRatings = allReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = (sumRatings / totalReviews).toFixed(1);

        // 6. Update the Product in the database
        await productModel.findByIdAndUpdate(productId, {
            totalReviews: totalReviews,
            averageRating: Number(averageRating)
        });

        res.json({ success: true, message: "Review submitted successfully!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get all reviews for a specific product
const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.body;
        const reviews = await reviewModel.find({ productId }).sort({ date: -1 });
        res.json({ success: true, reviews });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get recent reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find({}).sort({ date: -1 }).limit(10);
        res.json({ success: true, reviews });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to delete a review
const deleteReview = async (req, res) => {
    try {
        const { userId, reviewId } = req.body;

        const review = await reviewModel.findById(reviewId);

        if (!review) {
            return res.json({ success: false, message: "Review not found" });
        }

        // Check if the user is the owner of the review
        if (review.userId !== userId) {
            return res.json({ success: false, message: "You are not authorized to delete this review" });
        }

        const productId = review.productId;

        // Delete the review
        await reviewModel.findByIdAndDelete(reviewId);

        // Recalculate the Product's Average Rating
        const allReviews = await reviewModel.find({ productId });
        
        const totalReviews = allReviews.length;
        let averageRating = 0;

        if (totalReviews > 0) {
            const sumRatings = allReviews.reduce((sum, r) => sum + r.rating, 0);
            averageRating = (sumRatings / totalReviews).toFixed(1);
        }

        // Update the Product in the database
        await productModel.findByIdAndUpdate(productId, {
            totalReviews: totalReviews,
            averageRating: Number(averageRating)
        });

        res.json({ success: true, message: "Review deleted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default { addReview, getProductReviews, getAllReviews, deleteReview };
