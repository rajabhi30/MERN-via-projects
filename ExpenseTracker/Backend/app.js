const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const middleware = require("./Utility/middleware");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

const user = require("./Models/UserModel");
const expense = require("./Models/ExpenseModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());



app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    else {
        const isUserExist = await user.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ message: "User already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({ name, email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign(
            {
                id: newUser._id,
                email: newUser.email
            },
            process.env.JWT_SECRET
        );

        res.cookie("token", token);
        res.status(201).json({ message: "User created successfully" });


    }


});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    else {
        const isUserExist = await user.findOne({ email });
        if (!isUserExist) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, isUserExist.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(200).json({ message: "User logged in successfully" });
    }

});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
})


app.post("/dashboard/create", middleware, async(req, res) => {

    const {title, amount, category, date, type} = req.body;
    if(title && amount && category && date && type){
        const newExpense = new expense({title, amount, category, date, type, user: req.user.id});
        await newExpense.save();
        
        
        res.status(201).json({ message: "Expense created successfully" });
    }else{
        res.status(400).json({ message: "All fields are required" });
    }


})
app.get("/dashboard/history", middleware, async (req, res) => {
    const id = req.user.id;
    const {sort} = req.query;
    let sortStage = { createdAt: -1 };

    if (sort === "amount_desc") {
      sortStage = { amount: -1 };
    }

    if (sort === "amount_asc") {
      sortStage = { amount: 1 };
    }

    if(sort==='date_desc'){
        sortStage = { date: -1 };
    }

    if(sort==='date_asc'){
        sortStage = { date: 1 };
    }

    if(sort==='category_asc'){
        sortStage = { category: 1 };
    }

    if(sort==='category_desc'){
        sortStage = { category: -1 };
    }

    const expenses = await expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $sort: sortStage
      }
    ]);
    console.log(id);
    res.json(expenses);
    console.log(expenses);
});






const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;