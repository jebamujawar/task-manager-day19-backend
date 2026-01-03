const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Task");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


//connection string to mongoose
mongoose.connect("mongodb://localhost:27017/taskDB")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {inst
    console.log(error);
  });

// Routes

// Get all tasks
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Add new task
app.post("/tasks", async (req, res) => {
    const task = new Task({
        title: req.body.title
    });
    await task.save();
    res.status(201).json(task);
});

// Update task (toggle complete)
app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(task);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
