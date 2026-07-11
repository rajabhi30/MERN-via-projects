const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        console.error("Update MONGODB_URL in .env — use MongoDB Atlas if you don't have MongoDB locally.");
        process.exit(1);
    }
};

module.exports = connectDB;
