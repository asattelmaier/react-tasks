import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './components/TaskList.jsx';

const initalTasks = [{
  content: 'Task 1',
}, {
  content: 'Task 2',
  done: true,
}, {
  content: 'Task 3',
}];

function render() {
  ReactDOM.render(
    <TaskList tasks={initalTasks} />,
    document.getElementById('app'),
  );
}

render();
