const express = require("express");
const app = express();
const connectDB = require("./connectDB");
const { isLoggedIn, isAdmin , isAdminLoggedIN} = require("./middleware");

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
    const { name, email, password, role } = req.body;

    if (role === "admin") {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error occurred while hashing password");
                return;
            }
            const newAdmin = new adminSchema({
                name,
                email,
                password: hashedPassword,
                role: "Admin"
            });
            newAdmin.save()
                .then(() => {
                    res.status(201).send("Admin registered successfully");
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send("Error occurred while saving admin");
                });
        });
    } else {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error occurred while hashing password");
                return;
            }
            const newUser = new userSchema({
                name,
                email,
                role: role || "user",
                password: hashedPassword
            });
            newUser.save()
                .then((savedUser) => {
                    return adminSchema.updateMany({},{
                        $addToSet:{users:savedUser._id}
                    });
                })
                .then(() => {
                    res.status(201).send("User registered successfully");
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send("Error occurred while saving user");
                });
        });
    }
});

app.post("/login", (req, res) => {
    const { email, password, role } = req.body;

    if (role === "admin") {
        adminSchema.findOne({ email })
            .then((admin) => {
                if (!admin) {
                    res.status(404).send("Admin not found");
                    return;
                }
                bcrypt.compare(password, admin.password, (err, isMatch) => {
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
                        { id: admin._id, role: admin.role || "Admin" },
                        "secret key",
                        { expiresIn: "1d" }
                    );

                    res.cookie("token", token, {
                        httpOnly: true,
                        sameSite: "lax",
                        maxAge: 24 * 60 * 60 * 1000
                    });

                    res.status(200).json({
                        message: "Login successful for admin",
                        role: admin.role || "Admin",
                        name: admin.name
                    });

                });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send("Error occurred while finding admin");
            });
        return;
    }
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
                    { id: user._id, role: user.role },
                    "secret key",
                    { expiresIn: "1d" }
                );

                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "lax",
                    maxAge: 24 * 60 * 60 * 1000
                });

                res.status(200).json({
                    message: "Login successful for user",
                    role: user.role,
                    name: user.name
                });

            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error occurred while finding user");
        });
});




app.get("/logout", (req, res) => {
    if (req.cookies?.token) {
        res.clearCookie('token');
        res.status(200).send("Logout successful");
        return;
    }
    res.status(400).send("No token found");
});


app.get("/profile", isLoggedIn, async (req, res) => {
    try {
        const normalizedRole = typeof req.user?.role === 'string' ? req.user.role.trim().toLowerCase() : '';
        if (normalizedRole === 'admin') {
            const admin = await adminSchema.findById(req.user.id).select("_id name role");
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }
            return res.json(admin);
        }

        const user = await userSchema.findById(req.user.id).select("_id name role");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred while finding user/admin");
    }
});


app.get("/dashboard",isAdminLoggedIN,isAdmin, (req, res) => {
    res.json({ message: "Admin dashboard" });
})
app.post("/dashboard/create",isAdminLoggedIN,isAdmin, (req, res) => {
    const {title,description,status,userId}=req.body;
    const task=new taskSchema({
        title,
        description,
        status,
        userId
    });
    task.save()
    .then((savedTask)=>{
        return userSchema.findByIdAndUpdate(userId,{
            $push:{Tasks:savedTask._id}
        });
    })
    .then(()=>{
        res.status(201).send("Task created successfully");
    })
    .catch((error)=>{
        console.error(error);
        res.status(500).send("Error occurred while saving task");
    })
})

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to start server:', error);
    });


