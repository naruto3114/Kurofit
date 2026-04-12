import couponModel from "../models/couponModel.js";

// Generate a new Coupon
const generateCoupon = async (req, res) => {
    try {
        const { code, discount, expiryDate } = req.body;

        if (!code || !discount || !expiryDate) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const exactDate = new Date();
        exactDate.setDate(exactDate.getDate() + Number(expiryDate)); // expiryDate passed in as number of days

        const newCoupon = new couponModel({
            code: code.trim().toUpperCase(),
            discount: Number(discount),
            expiryDate: exactDate
        });

        await newCoupon.save();
        res.json({ success: true, message: "Coupon Generated Successfully" });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.json({ success: false, message: "Coupon code already exists" });
        }
        res.json({ success: false, message: error.message });
    }
};

// Validate and apply coupon for User
const verifyCoupon = async (req, res) => {
    try {
        const { code, cartTotal } = req.body;

        if (!code) {
           return res.json({ success: false, message: "Please provide a coupon code" });
        }

        const coupon = await couponModel.findOne({ code: code.toUpperCase() });

        if (!coupon) {
            return res.json({ success: false, message: "Invalid coupon code" });
        }

        if (!coupon.isActive) {
            return res.json({ success: false, message: "This coupon is no longer active" });
        }

        if (new Date() > coupon.expiryDate) {
            return res.json({ success: false, message: "This coupon has expired" });
        }

        // Calculate discount
        const discountAmount = (cartTotal * coupon.discount) / 100;
        const finalPrice = cartTotal - discountAmount;

        res.json({ 
            success: true, 
            message: `${coupon.discount}% Discount Applied!`,
            discountAmount,
            finalPrice,
            couponCode: coupon.code,
            discountPercentage: coupon.discount
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getCoupons = async (req, res) => {
    try {
        const coupons = await couponModel.find({});
        res.json({ success: true, coupons });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.body;
        await couponModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Coupon Deleted" });
    } catch (error) {
         console.log(error);
         res.json({ success: false, message: error.message });
    }
}


export { generateCoupon, verifyCoupon, getCoupons, deleteCoupon };
