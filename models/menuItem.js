const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['starter', 'main_course', 'dessert'],
        required: true,
    },
    is_drink: {
        type: Boolean,
        required: true,
        default: false,
    },
    is_veg: {
        type: Boolean,
        required: true,
    },
    num_sales: {
        type: Number,
        default: 0,
    },
});

const menuItem = mongoose.model('MenuItem', menuSchema);
module.exports = menuItem;