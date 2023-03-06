const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({   
    counter: {
        type: Number,
        required: true,        
    },
    post: { // which post the counter belongs to
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    user: { // user id that created counter
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },    
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Pattern", PatternSchema);