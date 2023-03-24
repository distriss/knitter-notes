const mongoose = require("mongoose");

const PatternSchema = new mongoose.Schema({
    patternTitle: {
        type: String,
        required: true,
    },
    patternDirections: {
        type: String,
        required: true,        
    },
    patternImage: {
        type: String,
    },
    patternFinalCount: {
        type: number,
    },
    patternOrder: {
        type: number,
        required: true,
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
    userName: { // userName that created pattern
        type: String,
        required: true,
    },    
    completed: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Pattern", PatternSchema);