import mongoose from "mongoose"

const productShema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Stock', 'Derivative', 'Commodity'],
        required: true
    },
    exchange: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    is_Active: {
        type: Boolean,
        default: true
    },
    symbol: {
        type: String
    }
},
    { timestamps: true }
)


export default mongoose.model("product", productShema)