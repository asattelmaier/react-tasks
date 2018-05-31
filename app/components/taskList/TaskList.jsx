import React from 'react';
import PropTypes from 'prop-types';
import Task from './../task/Task.jsx';
import TaskListAddTask from './../taskListAddTask/TaskListAddTask.jsx';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selected: null };

    this.buildTask = this.buildTask.bind(this);
    this.setSelectedTask = this.setSelectedTask.bind(this);
  }

  setSelectedTask(taskId) {
    this.setState({
      selected: taskId,
    });
  }

  buildTask(task) {
    return (
      <Task
        key={task._id}
        task={task}
        selected={this.state.selected}
        setSelected={this.setSelectedTask}
      />
    );
  }

  render() {
    return (
      <div>
        <TaskListAddTask />
        <ul className="task-list">
          {this.props.tasks.map(this.buildTask)}
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
