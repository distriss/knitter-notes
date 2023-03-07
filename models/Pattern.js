const mongoose = require("mongoose");

const PatternSchema = new mongoose.Schema({
    patternSectionTitle: {
        type: String,
        required: true,
    },
    patternSection: {
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
    post: { // which post the pattern belongs to
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    user: { // user id that created pattern
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },   
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Pattern", PatternSchema);