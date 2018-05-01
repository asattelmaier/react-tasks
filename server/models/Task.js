import mongoose from 'mongoose';

const TaskSchema = {
  content: String,
  done: Boolean,
};

const Task = mongoose.model('Task', TaskSchema, 'Tasks');

export default Task;
