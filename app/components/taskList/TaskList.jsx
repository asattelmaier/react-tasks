import React from 'react';
import PropTypes from 'prop-types';
import Task from './../task/Task.jsx';
import TaskListAddTask from './../taskListAddTask/TaskListAddTask.jsx';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selected: null };

    this.tasksOpen = [];
    this.tasksCompleted = [];

    this.buildTask = this.buildTask.bind(this);
    this.setSelectedTask = this.setSelectedTask.bind(this);
    this.setCompletedTasks = this.setCompletedTasks.bind(this);

    this.setCompletedTasks();
  }

  setCompletedTasks() {
    this.tasksCompleted = [];
    this.tasksOpen = [];

    this.props.tasks.forEach((task) => {
      if (task.done === true) {
        this.tasksCompleted.push(task);
      } else {
        this.tasksOpen.push(task);
      }
    });
  }

  setSelectedTask(taskId) {
    if (this.state.selected === taskId) {
      this.setState({
        selected: null,
      });
    } else {
      this.setState({
        selected: taskId,
      });
    }
  }

  buildTask(task) {
    return (
      <Task
        key={task._id}
        task={task}
        selected={this.state.selected}
        setSelected={this.setSelectedTask}
        setCompleted={this.setCompletedTasks}
      />
    );
  }

  render() {
    return (
      <div>
        <TaskListAddTask />
        <ul className="list tasks-open">
          {this.tasksOpen.map(this.buildTask)}
        </ul>
        <ul className="list tasks-completed">
          {this.tasksCompleted.map(this.buildTask)}
        </ul>
      </div>
    );
  }
}

const task = PropTypes.shape({
  content: PropTypes.string.isRequired,
  done: PropTypes.bool,
});

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(task).isRequired,
};

export default TaskList;
