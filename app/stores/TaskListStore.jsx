import Dispatcher from './../Dispatcher.js';
import restHelper from './../helpers/restHelper.js';

function TaskListStore() {
  let tasks = [];

  const listeners = [];

  function getTasks() {
    return tasks;
  }

  function triggerListeners() {
    listeners.forEach((listener) => {
      listener(tasks);
    });
  }

  function requestTasks() {
    restHelper.get('api/tasks/get')
      .then((response) => {
        tasks = response;

        triggerListeners();
      });
  }

  requestTasks();

  function onChange(listener) {
    listeners.push(listener);
  }

  function createTask(task) {
    restHelper.post('api/tasks/create', task)
      .then(requestTasks());
  }

  function updateTask(task) {
    restHelper.update('api/tasks/update', task)
      .then(requestTasks());
  }

  function deleteTask(task) {
    restHelper.del('api/tasks/delete', task)
      .then(requestTasks());
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
