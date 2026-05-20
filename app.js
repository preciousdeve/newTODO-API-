require('dotenv').config();
     const express = require('express');
     const cors = require('cors');
     const app = express();

    app.use(express.json());
    app.use(cors());

let todos = [
    { id: 1, task: 'Finished week 4 slides', completed: false },
    { id: 2, task: 'Deploy API (today)', completed: true },
];


app.get('/todos', (req, res) => res.status(200).json(todos));

app.post('/todos', (req, res) => {
   const { task } = req.body;
   if (!task) return res.status(400).json({ error: "Task is required"});
   const newTODO = { id: todos.length + 1, task, completed: false };
   todos.push(newTODO);
   res.status(201).json(newTODO);
});

app.get('/todos/:id', (req, res)=> {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.status(200).json(todo);
});


app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todo.find((t) => t.id === id);
    if (!todo) return res.status(404).json({ error: "Todo not found"});
    Object.assign(todo, req.body);
    res.status(200).json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const lenBefore = todos.length;
    todos = todos.filter((t) => t.id !== id);
    if (todos.length === lenBefore) 
        return res.status(404).json({ error: "Todo not found" });
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`NNEOMA API is running on port ${PORT}`));
