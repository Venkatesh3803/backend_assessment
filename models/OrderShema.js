import mongoose from "mongoose"


const orderShema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    type: {
        type: String,
        enum: ['Buy', 'Sell'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Sucessfull', 'Cancelled'],
        default: 'Pending'
    },
}, { timestamps: true })


export default mongoose.model("orders", orderShema)