const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true]
    },
    price: {
        type: Number,
        min: [0],
        required: [true]
    },
    image: {
        type: String,
        required: [true]
    },
    review: {
        type: String,
        required:[true]
 },
    rating: {
        type: Number,
     required: [true]
    }
})