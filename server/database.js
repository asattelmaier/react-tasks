import mongoose from 'mongoose';
import Task from './models/Task.js';

mongoose.connect('mongodb://localhost/task', () => {
  mongoose.connection.db.dropDatabase();

  // default test Tasks
  const tasks = [{
    __v: 1,
    _id: '5aee0cc07ea1be5712f53537',
    content: 'Task 1',
    done: true,
  }, {
    __v: 8,
    _id: '5aee0cf690215990c18fa3bc',
    content: 'Task 2',
    done: false,
  }, {
    __v: 5,
    _id: '5aee0d76a41af89c1345c660',
    content: 'Task 3',
    done: true,
  }];

  tasks.forEach((task) => {
    new Task(task).save();
  });
});
