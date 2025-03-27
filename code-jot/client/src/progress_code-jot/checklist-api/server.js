const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
    { id: 1, text: "Complete Project Report", completed: true, deadline: "2025-03-22T18:00:00Z" },
    { id: 2, text: "Finish the meeting", completed: false, deadline: "2025-03-24T20:00:00Z" },
    { id: 3, text: "End the project", completed: false, deadline: "2025-03-24T20:00:00Z" }
];

//  GET: Fetch tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

//  PUT: Update task completion
app.put("/api/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (typeof req.body.completed !== "boolean") {
        return res.status(400).json({ message: "Invalid request body" });
    }

    task.completed = req.body.completed;
    res.json(task);
});

//  POST: Add a new task
app.post("/api/tasks", (req, res) => {
    const { text, deadline } = req.body;
    if (!text || !deadline) return res.status(400).json({ message: "Missing required fields" });

    const newTask = {
        id: tasks.length + 1,
        text,
        completed: false,
        deadline: new Date(deadline).toISOString()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

//  DELETE: Remove a task
app.delete("/api/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === taskId);

    if (index === -1) return res.status(404).json({ message: "Task not found" });

    const deletedTask = tasks.splice(index, 1);
    res.json(deletedTask[0]);
});
// Serve React frontend (correct path)
app.use(express.static(path.join(__dirname, "../../client/dist")));  

// Handle React frontend routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));




