import Dispatcher from './../Dispatcher.js';
import restHelper from './../helpers/restHelper.js';

function TaskListStore() {
  let tasks = [];

  const listeners = [];

  function triggerListeners() {
    listeners.forEach((listener) => {
      listener(tasks);
    });
  }

  function initialGet() {
    restHelper.get('api/tasks/get')
      .then((response) => {
        tasks = response;

        triggerListeners();
      });
  }

  initialGet();

  function getTasks() {
    return tasks;
  }

  function onChange(listener) {
    listeners.push(listener);
  }

  function createTask(newTask) {
    tasks.push(newTask);

    triggerListeners();

    restHelper.post('api/tasks/create', newTask);
  }

  function updateTask(updatedTask) {
    tasks.filter(task => task._id === updatedTask._id);

    triggerListeners();

    restHelper.update('api/tasks/update', updatedTask);
  }

  function deleteTask(deletedTask) {
    const updatedTasks = tasks.filter(task =>
      task._id !== deletedTask._id);
    tasks = updatedTasks;

    triggerListeners();

    restHelper.del('api/tasks/delete', deletedTask);
  }

  Dispatcher.register((event) => {
    const { action, data } = event;

    switch (action) {
      case 'create': {
        createTask(data);
        break;
      }
      case 'update': {
        updateTask(data);
        break;
      }
      case 'delete': {
        deleteTask(data);
        break;
      }
      default: {
        break;
      }
    }
  });

  return {
    getTasks,
    onChange,
  };
}

export default TaskListStore();
