import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    thumbnails: {
        type: [String],
    },
    category: {
        type: String,
        required: true
    }
}
);

export const productsModel = mongoose.model("Products", productsSchema);