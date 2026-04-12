import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    phone: { type: String, default: '' },
    image: { type: String, default: '' },
    gender: { type: String, default: 'Not Selected' },
    dob: { type: String, default: 'Not Selected' },
    addresses: { type: Array, default: [] },
    wishlist: { type: Array, default: [] },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
