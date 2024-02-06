const express = require('express');
const basicAuth = require('express-basic-auth');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

const users = {
  'admin': 'adminpassword',
};

app.use(basicAuth({
  users: users,
  challenge: true,
  unauthorizedResponse: 'Unauthorized Access',
}));

let tasks = [
  { id: 1, description: 'Feed the dogs', completed: false },
  { id: 2, description: 'Take dogs for a walk', completed: true },
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    description: req.body.description,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].completed = req.body.completed;
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
