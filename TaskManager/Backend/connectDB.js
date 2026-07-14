const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskmanager';

    try {
        await mongoose.connect(uri);
        console.log(`MongoDB connected to ${uri}`);
    } catch (error) {
        console.error('MongoDB connection error:', error.message || error);
        process.exit(1);
    }
};

module.exports = connectDB;
