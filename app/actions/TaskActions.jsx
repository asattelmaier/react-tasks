import Dispatcher from './../Dispatcher.js';

const TaskActions = {
  createTask: (task) => {
    Dispatcher.dispatch({
      data: task,
      action: 'create',
    });
  },
  updateTask: (task) => {
    Dispatcher.dispatch({
      data: task,
      action: 'update',
    });
  },
  deleteTask: (task) => {
    Dispatcher.dispatch({
      data: task,
      action: 'delete',
    });
  },
};

export default TaskActions;
