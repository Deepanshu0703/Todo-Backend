const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const subTaskRoutes = require('./routes/subTaskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Todo').then(() => {
  console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error(err);
  }); 
const db = mongoose.connection;

app.use('/tasks', taskRoutes);
app.use('/sub-tasks', subTaskRoutes);
app.use('/users', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
