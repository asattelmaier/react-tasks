import mongoose from 'mongoose';

const TaskSchema = {
  __v: Number,
  _id: String,
  content: String,
  done: Boolean,
};

const Task = mongoose.model('Task', TaskSchema, 'Tasks');

export default Task;
