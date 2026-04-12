import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
    discount: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    expiryDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const couponModel = mongoose.models.coupon || mongoose.model("coupon", couponSchema);

export default couponModel;
