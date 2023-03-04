const mongoose = require("mongoose");

const PatternSchema = new mongoose.Schema({
    pattern: {
        type: String,
        default: 'original'
    },
    craft: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    yarn: {
        type: String,
        required: true,
    },
    yarnWeight: {
        type: String,
        required: true,
    },
    gauge: {
        type: String,
    },
    needleSize: {
        type: String,
        required: true,
    },
    yardage: {
        type: String,
    },
    sizes: {
        type: String,
        default: 'one size'
    },
    post: { // which post the pattern belongs to
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },    
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Pattern", PatternSchema);