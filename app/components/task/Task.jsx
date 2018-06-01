import React from 'react';
import PropTypes from 'prop-types';
import TaskActions from './../../actions/TaskActions.jsx';

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.isSelected = false;

    this.setSelected = this.setSelected.bind(this);
    this.setCompleted = this.setCompleted.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentWillUpdate(nextProps) {
    this.isSelected =
      nextProps.selected === nextProps.task._id;
  }

  setSelected() {
    this.props.setSelected(this.props.task._id);
  }

  setCompleted(e) {
    e.preventDefault();

    this.props.task.done = !this.props.task.done;

    TaskActions.updateTask(this.props.task);

    this.props.setCompleted();
  }

  deleteTask(e) {
    e.preventDefault();

    TaskActions.deleteTask(this.props.task);
  }

  render() {
    return (
      <li
        className={
          this.isSelected ? 'task task--active' : 'task'
        }
      >
        <button
          className="
            task__btn
            task__btn-open-actions
          "
          onClick={this.setSelected}
        >
          {this.props.task.content}
        </button>
        <button
          className="
            task__btn
            task__btn-action
            task__btn-done
          "
          onClick={this.setCompleted}
        >
          Aufgabe Erledigt
        </button>
        <button
          className="
            task__btn
            task__btn-action
            task__btn-delete
          "
          onClick={this.deleteTask}
        >
          Aufgabe Löschen
        </button>
      </li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }),
  setSelected: PropTypes.func.isRequired,
  setCompleted: PropTypes.func.isRequired,
  selected: PropTypes.string,
};

Task.defaultProps = {
  task: PropTypes.shape({
    done: false,
  }),
  selected: null,
};

export default Task;
