const mongoose = require("mongoose");

const items = mongoose.Schema({
    category: String,
    item: String,
    eta: Number,
    user: mongoose.Schema.ObjectId
})

const itemSchema = mongoose.model("items", items);

module.exports = itemSchema;