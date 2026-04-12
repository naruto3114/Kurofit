import express from 'express';
import reviewController from '../controllers/reviewController.js';
import authUser from '../middleware/auth.js'; // Assuming you have an auth middleware that extracts the userId from the token

const reviewRouter = express.Router();

// The authUser middleware ensures only logged-in users can post reviews
reviewRouter.post('/add', authUser, reviewController.addReview); 

// Anyone can read reviews, so no middleware needed here
reviewRouter.post('/product', reviewController.getProductReviews);
reviewRouter.post('/delete', authUser, reviewController.deleteReview);
reviewRouter.get('/list-all', reviewController.getAllReviews);

export default reviewRouter;
