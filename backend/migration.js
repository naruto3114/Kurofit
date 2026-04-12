import 'dotenv/config';
import mongoose from 'mongoose';
import productModel from './models/productModel.js';

const migrate = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const products = await productModel.find();
        console.log(`Found ${products.length} products to migrate`);

        for (const p of products) {
            // Mapping logic:
            // 1. If product has subCategory (old field), use it as new category
            // 2. If product has productType (old field), use it as new subcategory
            
            const oldCategory = p.category;
            const oldSubCategory = p.subcategory || p.subCategory; // Some might already be renamed
            const oldProductType = p.productType;

            let newCategory = '';
            let newSubcategory = '';

            // Map old subCategory to new category
            if (oldSubCategory) {
                newCategory = oldSubCategory.toLowerCase();
            } else {
                newCategory = 'topwear'; // Fallback
            }

            // Map old productType to new subcategory
            if (oldProductType) {
                newSubcategory = oldProductType.toLowerCase();
            } else {
                newSubcategory = 'tshirt'; // Fallback
            }

            // Perform atomic update to unset old fields and set new ones
            await productModel.collection.updateOne(
                { _id: p._id },
                { 
                    $set: { 
                        category: newCategory, 
                        subcategory: newSubcategory 
                    },
                    $unset: { 
                        productType: "", 
                        subCategory: "" 
                    } 
                }
            );
        }

        console.log('Migration complete successfully');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

migrate();
