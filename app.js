require('dotenv').config();
     const express = require('express');
     const cors = require('cors');
     const logRequest = require('./middlewares/logger.js');
     const validateTodo = require('./middlewares/validator.js');
     const errorHandler = require('./middlewares/errorHandler.js');
     const app = express();
    

    app.use(express.json());
    app.use(cors());
    app.use(logRequest); 

let todos = [
    { id: 1, task: 'Finished week 4 slides', completed: false },
    { id: 2, task: 'Deploy API (today)', completed: true },
];


app.get('/todos', (req, res, next) => res.status(200).json(todos));

app.post('/todos',validateTodo, async (req, res, next) => {
    try {
   const { task } = req.body;

  
    const newTODO = { id: todos.length + 1, task, completed: false };
   todos.push(newTODO);
   res.status(201).json(newTODO);
} catch (error) {
    next(error);
 
   res.status(500).json({ error: "Internal server error" });
next(error);}
});

app.get('/todos/:id', (req, res, next) => { 
    try {
    const id = parseInt(req.params.id);
    if(isNaN(id)) {
        throw new Error("Invalid ID");
    }
    const todo = todos.find(t => t.id === id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.status(200).json(todo);
} catch (error) {
    next(error);
}
});


app.patch('/todos/:id', (req, res, next) => {
    try {
    const id = parseInt(req.params.id);
     const todo = todos.find((t) => t.id === id);
    if (!todo) return res.status(404).json({ error: "Todo not found"});
    Object.assign(todo, req.body);
    res.status(200).json(todo);
} catch (error) {
    res.status(500).json({ error: "Internal server error" });
    next(error);
}
});

app.delete('/todos/:id', (req, res, next) => {
    try {
    const id = parseInt(req.params.id);
    const lenBefore = todos.length;
    todos = todos.filter((t) => t.id !== id);
    if (todos.length === lenBefore) 
        return res.status(404).json({ error: "Todo not found" });
    res.status(204).send();
} catch (error) {
    next(error);
}
});

app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`NNEOMA API is running on port ${PORT}`));
