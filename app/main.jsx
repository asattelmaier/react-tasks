import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './components/TaskList.jsx';
import TaskListStore from './stores/TaskListStore.js';

let initialTasks = TaskListStore.httpGetInitialTasks();

const appElement = document.getElementById('app');

function render() {
  ReactDOM.render(
    <TaskList tasks={initialTasks} />,
    appElement,
  );
}

TaskListStore.onChange((updatedTasks) => {
  initialTasks = updatedTasks;
  render();
});

initialTasks.then(() => render());
