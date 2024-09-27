const express = require('express');
const app = express();
const { todo } = require('./db');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const { updateTodo, createTodo } = require('./types');

// Create a new todo
app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if (!parsePayload.success) {
        return res.status(411).json({
            msg: 'Invalid inputs',
        });
    }
    
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false,
    });
    res.json({
        msg: 'Todo created!',
    });
});

// Get all todos
app.get('/todos', async (req, res) => {
    const todos = await todo.find({});
    res.json({
        todos,
    });
});
app.get("/",(req,res)=>{
return  res.json("hello");
})
// Mark a todo as completed or not completed
app.put('/completed', async (req, res) => {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    if (!parsePayload.success) {
        return res.status(411).json({
            msg: 'Invalid inputs',
        });
    }

    const todoItem = await todo.findById(req.body.id);
    if (!todoItem) {
        return res.status(404).json({
            msg: 'Todo not found',
        });
    }
    await todo.findByIdAndUpdate(req.body.id, { completed: !todoItem.completed });
    res.json({
        msg: 'Todo updated',
    });
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({
                msg: 'Todo not found',
            });
        }
        res.json({
            msg: 'Todo deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            error: error.message,
        });
    }
});

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});
