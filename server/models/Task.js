import mongoose from 'mongoose';

const TaskSchema = {
  content: String,
  done: Boolean,
  id: String,
};

const Task = mongoose.model('Task', TaskSchema, 'Tasks');

export default Task;
