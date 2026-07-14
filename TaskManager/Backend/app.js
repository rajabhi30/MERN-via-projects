const express = require("express");
const app = express();
const connectDB = require("./connectDB");
const isLoggedIn = require("./middleware");

const userSchema = require("./Models/usermodel");
const taskSchema = require("./Models/taskmodel");
const adminSchema = require("./Models/adminmodel");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Backend is running...");
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error occurred while hashing password");
            return;
        }
        const newUser = new userSchema({
            name,
            email,
            password: hashedPassword
        });
        newUser.save()
            .then(() => {
                res.status(201).send("User registered successfully");
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send("Error occurred while saving user");
            });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    userSchema.findOne({ email })
        .then((user) => {
            if (!user) {
                res.status(404).send("User not found");
                return;
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Error occurred while comparing passwords");
                    return;
                }
                if (!isMatch) {
                    res.status(401).send("Invalid password");
                    return;
                }
                const token = jwt.sign(
                    { id: user._id },
                    "secret key",
                    { expiresIn: "1d" }
                );

                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "lax",
                    maxAge: 24 * 60 * 60 * 1000
                });

                res.status(200).json({
                    message: "Login successful"
                });

            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error occurred while finding user");
        });
});

app.get("/logout", (req, res) => {
    res.clearCookie('token');
    res.status(200).send("Logout successful");
});


app.get("/profile", isLoggedIn, (req, res) => {
    res.send(`Welcome to your profile!`);
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to start server:', error);
    });


