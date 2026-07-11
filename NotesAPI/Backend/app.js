const express = require("express");
const app = express();
const connectDB = require("./connectDB");
const Todo = require("./TaskModel");
const dotenv=require("dotenv");
dotenv.config();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

connectDB();

const cors = require("cors");
app.use(cors());


app.get("/",(req,res)=>{
    res.send("Hello World");
});


app.post("/addTasks", async(req,res)=>{
    const{title,description,completed}=req.body;
    if(!title||!description){
        return res.status(400).send("Please fill all the fields");
    }
    const todo=new Todo({
        title,
        description,
        completed
    })
    await todo.save();
    res.send("Task added successfully");
})

app.get("/getAllTasks",async(req,res)=>{
    const todos=await Todo.find();
    res.send(todos);
})

app.put("/toggle/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        return res.status(404).send("Task not found");
    }
    todo.completed = !todo.completed;
    await todo.save();
    res.send("Task toggled successfully");
})

app.delete("/delete/:id",async(req,res)=>{
    const todo=await Todo.findByIdAndDelete(req.params.id);
    res.send("Task deleted successfully");
})



const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
});

