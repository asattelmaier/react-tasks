import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './components/TaskList.jsx';
import TaskListStore from './stores/TaskListStore.jsx';

let initalTasks = TaskListStore.getTasks();

function render() {
  ReactDOM.render(
    <TaskList tasks={initalTasks} />,
    document.getElementById('app'),
  );
}

TaskListStore.onChange((items) => {
  initalTasks = items;
  render();
});

render();
