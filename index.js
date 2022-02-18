require("./config/database").connect();
const express = require("express");
const Task = require("./models/Task");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Hello World",
    });
});

app.post("/task", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.json({
                error: "Please provide a valid name!",
            });
        }
        const task = await Task.create({ name });
        res.json({
            message: `${name} added successfully`,
            task,
        });
    } catch (error) {
        res.status(400).json({
            error: "Something went wrong",
        });
    }
});

app.put("/task/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const { name } = req.body;

        const task = await Task.findOne({ _id: taskId });
        task.name = name;
        await task.save();
        res.json({
            message: "Task Updated Successfully",
        });
    } catch (error) {
        res.json({
            error: "Something went wrong",
        });
    }
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json({
            tasks,
        });
    } catch (error) {
        res.json({
            error: "Something went wrong",
        });
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
