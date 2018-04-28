// modules
import React from 'react';
import PropTypes from 'prop-types';

function Task({ task }) {
  return (
    <li>
      <button> done</button>
      <p>
        {task.content}
      </p>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    content: PropTypes.string,
  }).isRequired,
};

export default Task;
