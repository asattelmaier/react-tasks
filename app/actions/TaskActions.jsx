import Dispatcher from './../Dispatcher.js';

const TaskActions = {
  createTask: (task) => {
    Dispatcher.dispatch({
      task,
      action: 'create',
    });
  },
  updateTask: (task) => {
    Dispatcher.dispatch({
      task,
      action: 'update',
    });
  },
  deleteTask: (task) => {
    Dispatcher.dispatch({
      task,
      action: 'delete',
    });
  },
};

export default TaskActions;
