import mongoose from "mongoose"

const userShema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
    },
    address: {
        type: String,
    },

    balance: {
        type: Number,
        default: 5000,
    },
    is_Active: {
        type: Boolean,
        default: true
    }

},
    { timestamps: true }
)


export default mongoose.model("user", userShema)