import Dispatcher from './../Dispatcher.js';
import restHelper from './../helpers/restHelper.js';

function TaskListStore() {
  let tasks = [];

  const registeredFunctions = [];

  function getTasks() {
    return tasks;
  }

  function triggerRegisteredFunctions() {
    registeredFunctions.forEach((registeredFuntion) => {
      registeredFuntion(getTasks());
    });
  }

  function updateTasks(updatedTasks) {
    tasks = updatedTasks;

    triggerRegisteredFunctions();
  }

  function onChange(newRegisteredFuntion) {
    if (typeof newRegisteredFuntion === 'function') {
      registeredFunctions.push(newRegisteredFuntion);
    }
  }

  function httpGetTasks() {
    restHelper.httpGet('api/tasks/get')
      .then((response) => {
        updateTasks(response);
      });
  }

  function getInitialTasks() {
    httpGetTasks();
    return tasks;
  }

  function httpPostTask(task) {
    restHelper.httpPost('api/tasks/create', task)
      .then(httpGetTasks());
  }

  function httpPatchTask(task) {
    restHelper.httpPatch('api/tasks/update', task)
      .then(httpGetTasks());
  }

  function httpDeleteTask(task) {
    restHelper.httpDelete('api/tasks/delete', task)
      .then(httpGetTasks());
  }

  Dispatcher.register((taskActions) => {
    const { action, task } = taskActions;

    switch (action) {
      case 'create': {
        httpPostTask(task);
        break;
      }
      case 'update': {
        httpPatchTask(task);
        break;
      }
      case 'delete': {
        httpDeleteTask(task);
        break;
      }
      default: {
        break;
      }
    }
  });

  return {
    getInitialTasks,
    onChange,
  };
}

export default TaskListStore();
