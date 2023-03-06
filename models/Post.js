const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    cloudinaryId: {
        type: String,
        require: true,
    },
    caption: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    origin: {
        type: String,
        default: 'original'
    },
    craft: {
        type: String,
    },
    category: {
        type: String,
    },
    yarn: {
        type: String,
        required: true,
    },
    yarnWeight: {
        type: String,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", PostSchema);