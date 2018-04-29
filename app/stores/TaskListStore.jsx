import Dispatcher from './../Dispatcher.js';

function TaskListStore() {
  let tasks = [{
    id: 1,
    content: 'Task 1',
  }, {
    id: 2,
    content: 'Task 2',
    done: true,
  }, {
    id: 3,
    content: 'Task 3',
  }];

  const listeners = [];

  function getTasks() {
    return tasks;
  }

  function onChange(listener) {
    listeners.push(listener);
  }

  function triggerListeners() {
    listeners.forEach((listener) => {
      listener(tasks);
    });
  }

  function getNewId() {
    let newId = 0;
    const tasksLength = tasks.length;

    for (let i = 0; i < tasksLength; i += 1) {
      const { id } = tasks[i];
      if (id > newId) {
        newId = id;
      }
    }

    return newId + 1;
  }

  function createTask(newTask) {
    const currentTask = newTask;
    currentTask.id = getNewId();

    tasks.push(currentTask);

    triggerListeners();
  }

  function updateTask(updatedTask) {
    tasks.filter(task => task.id === updatedTask.id);

    triggerListeners();
  }

  function deleteTask(deletedTask) {
    const updatedTasks = tasks.filter(task =>
      task.id !== deletedTask.id);
    tasks = updatedTasks;

    triggerListeners();
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
