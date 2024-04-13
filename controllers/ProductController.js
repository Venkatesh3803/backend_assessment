import ProductModel from "../models/ProductModel.js"

export const createProduct = async (req, res) => {
    try {
        const newProduct = await ProductModel(req.body);
        const product = await newProduct.save();

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json(error.message)
    }
}



export const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) return res.status(401).json("Product not avaliable")

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) return res.status(401).json("Product not avaliable")
        const updated = await ProductModel.findByIdAndUpdate(product._id, req.body, { new: true })
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) return res.status(401).json("Product not avaliable")

        await ProductModel.findByIdAndDelete(product._id)
        res.status(200).json("Deleted Sucessfully")
    } catch (error) {
        res.status(500).json(error.message)
    }
}


