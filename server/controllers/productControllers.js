import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
}

export const getProductById = async (req, res) => {

    const product = await Product.findById(req.params.id);
    if (product) {
        res.status(200).json(product);
    }
    else {
        res.status(404);
        throw new Error('Product not found')
    }

}