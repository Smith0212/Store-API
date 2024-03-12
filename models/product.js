const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require : [true, "product name must be provided"],
    },
    price: {
        type: Number,
        require: [true, "product price must be provided"],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        enm: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{VALUE} is not supported",
        }
        // enum: ["ikea", "liddy", "caressa", "marcos"] //by using this enum property we can restrict the options
    }
})

module.exports = mongoose.model("Product", productSchema)