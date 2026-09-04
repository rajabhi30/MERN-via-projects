const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    expense: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "expense"
    },
    totals:{
        type: [{
            amount: Number,
            type: String,
            enum: ["income", "expense"],
            date: Date
        }]
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;