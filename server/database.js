import mongoose from 'mongoose';
import Task from './models/Task.js';

mongoose.connect('mongodb://localhost/task', () => {
  mongoose.connection.db.dropDatabase();

  // default test Tasks
  const tasks = [{
    content: 'Task 1',
  }, {
    content: 'Task 2',
    done: true,
  }, {
    content: 'Task 3',
  }];

  tasks.forEach((task) => {
    new Task(task).save();
  });
});
