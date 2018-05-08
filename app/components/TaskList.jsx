import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task.jsx';
import TaskListAddItem from './TaskListAddItem.jsx';

function TaskList({ tasks }) {
  return (
    <div>
      <TaskListAddItem />
      <ul className="task-list">
        {tasks.map(task => <Task key={task._id} task={task} />)}
      </ul>
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
