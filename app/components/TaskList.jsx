// modules
import React from 'react';
import PropTypes from 'prop-types';
// components
import Task from './Task.jsx';
import TaskListAddItem from './TaskListAddItem.jsx';

function TaskList({ tasks }) {
  return (
    <div>
      <TaskListAddItem />
      <div>
        {tasks.map(task => <Task key={task.content} task={task} />)}
      </div>
    </div>
  );
}

const task = PropTypes.shape({
  content: PropTypes.string.isRequired,
  done: PropTypes.bool,
});

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(task).isRequired,
};

export default TaskList;
