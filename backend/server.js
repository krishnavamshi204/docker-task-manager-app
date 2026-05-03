const crypto = require('crypto');
global.crypto = crypto;
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/tasks');

const Task = mongoose.model('Task', { name: String });

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task({ name: req.body.name });
  await task.save();
  res.json(task);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});