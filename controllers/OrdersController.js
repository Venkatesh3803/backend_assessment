import orderModel from "../models/OrderShema.js"
import UserModel from "../models/UserModel.js";



export const createOrder = async (req, res) => {
    const { userId, price } = req.body;
    try {
        const newOrder = await orderModel(req.body);
        const currUser = await UserModel.findById(userId)

        const alreadyExistOrderBuy = await orderModel.findOne({ userId: newOrder.userId, product: newOrder.product, type: newOrder.type });
        if (currUser.balance < price) return res.status(401).json("Insuffient Balance")

        if (alreadyExistOrderBuy) {
            let reduceAmount = currUser.balance - price;
            let updatedPrice = alreadyExistOrderBuy.price + price
            let updatedQty = alreadyExistOrderBuy.quantity + req.body.quantity;
            await UserModel.updateOne({ balance: reduceAmount })
            await orderModel.updateOne({ price: updatedPrice, quantity: updatedQty })

            return res.status(200).json("sucessfully Orderd")
        }

        let reduceAmount = currUser.balance - price;
        await UserModel.updateOne({ balance: reduceAmount })
        await UserModel.updateOne({ balance: reduceAmount })
        const Order = await newOrder.save();
        res.status(201).json(Order)
    } catch (error) {
        res.status(500).json(error.message)
    }
}



export const getOrder = async (req, res) => {
    try {
        const Order = await orderModel.findById(req.params.id);
        if (!Order) return res.status(401).json("Order not avaliable")

        res.status(200).json(Order)
    } catch (error) {
        res.status(500).json(error.message)
    }
}



export const getAllOrder = async (req, res) => {
    try {
        const orders = await orderModel.find();
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error.message)
    }
}



export const updateOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);
        if (!order) return res.status(401).json("Order not avaliable")

        const updated = await orderModel.findByIdAndUpdate(order._id, req.body, { new: true })
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json(error.message)
    }
}



export const deleteOrder = async (req, res) => {
    try {
        const Order = await orderModel.findById(req.params.id);
        if (!Order) return res.status(401).json("Order not avaliable")

        await orderModel.findByIdAndDelete(Order._id)
        res.status(200).json("Deleted Sucessfully")
    } catch (error) {
        res.status(500).json(error.message)
    }
}

