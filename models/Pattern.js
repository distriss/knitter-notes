const mongoose = require("mongoose");

const PatternSchema = new mongoose.Schema({   
    patternSection: {
        type: String,
        required: true,        
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