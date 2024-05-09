const express = require('express');
const app = express();
const PORT = 3000; 

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy data for demonstration
let tasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', dueDate: '2024-05-10' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', dueDate: '2024-05-15' }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTask = { id: tasks.length + 1, title, description, dueDate };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, dueDate } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { id: taskId, title, description, dueDate };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
