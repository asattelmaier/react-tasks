// modules
import React from 'react';
import PropTypes from 'prop-types';
// actions
import TaskActions from './../actions/TaskActions.jsx';

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDone = this.toggleDone.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  toggleDone(e) {
    e.preventDefault();

    const currentTask = this.props.task;

    if (currentTask.done === true) {
      currentTask.done = false;
    } else {
      currentTask.done = true;
    }

    TaskActions.updateTask(currentTask);
  }

  deleteTask(e) {
    e.preventDefault();

    TaskActions.deleteTask(this.props.task);
  }

  render() {
    return (
      <div>
        <li>
          <p>
            {this.props.task.content}
          </p>
        </li>
        <form onSubmit={this.toggleDone}>
          <button>
            {this.props.task.done ? 'Done' : 'Not Done'}
          </button>
        </form>
        <form onSubmit={this.deleteTask}>
          <button>Delete</button>
        </form>
      </div>
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
