import Dispatcher from './../Dispatcher.js';
import restHelper from './../helpers/restHelper.js';
import TaskListLocalStore from './../stores/TaskListLocalStore.js';

function TaskListStore() {
  let _tasks = [];
  const registeredFunctions = [];

  function getTasks() {
    return _tasks;
  }

  function setTasks(newTasks) {
    _tasks = newTasks;
  }

  function triggerRegisteredFunctions() {
    registeredFunctions.forEach((registeredFuntion) => {
      registeredFuntion(getTasks());
    });
  }

  function updateTasks(updatedTasks) {
    setTasks(updatedTasks);

    triggerRegisteredFunctions();
  }

  function onChange(newRegisteredFuntion) {
    if (typeof newRegisteredFuntion === 'function') {
      registeredFunctions.push(newRegisteredFuntion);
    }
  }

  function httpGetTasks() {
    return new Promise((resolve, reject) => {
      restHelper.httpGet('api/tasks/get')
        .then((onlineTasks) => {
          updateTasks(onlineTasks);
          resolve();
        })
        .catch(() => {
          TaskListLocalStore
            .getTasks()
            .then((localTasks) => {
              updateTasks(localTasks);
              resolve();
            })
            .catch(() => reject());
        });
    });
  }

  function httpGetInitialTasks() {
    return new Promise((resolve) => {
      httpGetTasks()
        .then(() => {
          TaskListLocalStore.createLocalStore(getTasks());
          resolve(getTasks());
        });
    });
  }

  function httpPostTask(task) {
    restHelper.httpPost('api/tasks/create', task)
      .then(() => httpGetTasks())
      .catch(() => {
        TaskListLocalStore.putTask(task);
      });
  }

  function httpPatchTask(task) {
    restHelper.httpPatch('api/tasks/update', task)
      .then(() => httpGetTasks());
  }

  function httpDeleteTask(task) {
    restHelper.httpDelete('api/tasks/delete', task)
      .then(() => httpGetTasks());
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
    httpGetInitialTasks,
    onChange,
  };
}

export default TaskListStore();
