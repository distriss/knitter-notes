const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    post: { // which post the comment belongs to
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    user: { // user id that created comment
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
    userName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Comment", CommentSchema);