import React from 'react';
import PropTypes from 'prop-types';
import TaskActions from './../actions/TaskActions.jsx';

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDone = this.toggleDone.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  toggleDone(e) {
    e.preventDefault();

    this.props.task.done = !this.props.task.done;

    TaskActions.updateTask(this.props.task);
  }

  deleteTask(e) {
    e.preventDefault();

    TaskActions.deleteTask(this.props.task);
  }

  render() {
    return (
      <li className="task">
        {this.props.task.content}
      </li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    content: PropTypes.string.isRequired,
    done: PropTypes.bool,
  }),
};

Task.defaultProps = {
  task: PropTypes.shape({
    done: false,
  }),
};

export default Task;
