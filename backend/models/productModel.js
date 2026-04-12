import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
    limitedDrop: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, required: true, default: 1 },
    date: { type: Number, required: true },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
