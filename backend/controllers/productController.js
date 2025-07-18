import asyncHandler from "../middleware/AsyncHandler.js";
import Product from '../model/productModel.js'

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields

        switch (true) {
            case !name:
                return res.json({ error: "Name is required" })
            case !brand:
                return res.json({ error: "Brand is required" })
            case !description:
                return res.json({ error: "Description is required" })
            case !price:
                return res.json({ error: "Price is required" })
            case !category:
                return res.json({ error: "Category is required" })
            case !quantity:
                return res.json({ error: "Quantity is required" })
        }

        const product = new Product({ ...req.fields });
        await product.save();
        res.json(product);

    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
});

const updateProductDetails = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields

        switch (true) {
            case !name:
                return res.json({ error: "Name is required" })
            case !brand:
                return res.json({ error: "Brand is required" })
            case !description:
                return res.json({ error: "Description is required" })
            case !price:
                return res.json({ error: "Price is required" })
            case !category:
                return res.json({ error: "Category is required" })
            case !quantity:
                return res.json({ error: "Quantity is required" })
        }

        const product = await Product.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true });

        await Product.save();

        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
});

const removeProduct = asyncHandler(async (req, res) => {
    try {

        const product = await product.findByIdAndDelete(req.params.id);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" })
    }
});

const fetchProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6;
        const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {};

        const count = await Product.countDocuments({ ...keyword })
        const products = await Product.find({ ...keyword }).limit(pageSize);

        res.json({
            products, page: 1, pages: Math.ceil(count / pageSize),
            hasMore: false,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error" })
    }
})
export { addProduct, updateProductDetails, removeProduct, fetchProducts }