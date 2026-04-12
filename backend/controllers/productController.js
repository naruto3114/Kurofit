import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"
import reviewModel from "../models/reviewModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subcategory, sizes, bestseller, limitedDrop, quantity } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productQty = Number(quantity) || 0;

        const productData = {
            name,
            description,
            category: category.toLowerCase(),
            price: Number(price),
            subcategory: subcategory.toLowerCase(),
            bestseller: bestseller === "true" || bestseller === true,
            limitedDrop: limitedDrop === "true" || limitedDrop === true,
            inStock: productQty > 0,
            quantity: productQty,
            sizes: typeof sizes === 'string' ? JSON.parse(sizes) : sizes,
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {

        const products = await productModel.find({}).sort({ date: -1 });
        res.json({ success: true, products })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for dynamic categories
const getCategories = async (req, res) => {
    try {
        const categories = await productModel.distinct("category");
        const subcategories = await productModel.distinct("subcategory");
        res.json({ success: true, categories, subcategories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for getting cloudinary public id from url
const getPublicId = (url) => {
    return url.split('/').pop().split('.')[0];
}

// function for removing product
const removeProduct = async (req, res) => {
    try {

        const { id } = req.body;
        const product = await productModel.findById(id);

        if (!product) {
            return res.json({ success: false, message: "Product not found" })
        }

        // 1. Delete associated reviews
        await reviewModel.deleteMany({ productId: id });

        // 2. Delete images from Cloudinary
        const images = product.image || [];
        for (const url of images) {
            const publicId = getPublicId(url);
            await cloudinary.uploader.destroy(publicId);
        }

        // 3. Delete product document
        await productModel.findByIdAndDelete(id)

        res.json({ success: true, message: "Product Removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {

        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for updating product stock
const updateProductStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await productModel.findByIdAndUpdate(id, { inStock });
        res.json({ success: true, message: "Product Stock Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for editing product details
const editProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subcategory, sizes, bestseller, limitedDrop, quantity } = req.body;

        const product = await productModel.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        const productQty = Number(quantity) || 0;
        let imagesUrl = [...product.image];

        // Process new images if uploaded
        if (req.files) {
            const image1 = req.files.image1 && req.files.image1[0]
            const image2 = req.files.image2 && req.files.image2[0]
            const image3 = req.files.image3 && req.files.image3[0]
            const image4 = req.files.image4 && req.files.image4[0]

            const newImages = [
                { file: image1, index: 0 },
                { file: image2, index: 1 },
                { file: image3, index: 2 },
                { file: image4, index: 3 }
            ];

            for (const item of newImages) {
                if (item.file) {
                    // 1. Delete old image if it exists at this index
                    if (imagesUrl[item.index]) {
                        const oldPublicId = getPublicId(imagesUrl[item.index]);
                        await cloudinary.uploader.destroy(oldPublicId);
                    }
                    // 2. Upload new image
                    const result = await cloudinary.uploader.upload(item.file.path, { resource_type: 'image' });
                    imagesUrl[item.index] = result.secure_url;
                }
            }
        }

        const updatedData = {
            name,
            description,
            category: category.toLowerCase(),
            price: Number(price),
            subcategory: subcategory.toLowerCase(),
            bestseller: bestseller === "true" || bestseller === true,
            limitedDrop: limitedDrop === "true" || limitedDrop === true,
            inStock: productQty > 0,
            quantity: productQty,
            sizes: typeof sizes === 'string' ? JSON.parse(sizes) : sizes,
            image: imagesUrl.filter(item => item !== null) // Remove any gaps
        };

        await productModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.json({ success: true, message: "Product Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { listProducts, addProduct, removeProduct, singleProduct, updateProductStock, editProduct, getCategories }
