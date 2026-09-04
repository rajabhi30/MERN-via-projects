const { Schema, model } = require("mongoose");
const expenseSchema = new Schema({
    title: String,
    amount: Number,
    category: String,
    date: Date,
    type: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Expense = model("expense", expenseSchema);

module.exports = Expense;