import React from 'react';
import TaskActions from './../../actions/TaskActions.jsx';

class TaskListAddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  addTask(e) {
    e.preventDefault();

    TaskActions.createTask({ content: this.state.value });

    this.setState({
      value: '',
    });
  }

  render() {
    return (
      <div className="add-task">
        <form
          className="add-task__form"
          onSubmit={this.addTask}
        >
          <input
            className="add-task__text"
            type="text"
            placeholder="Neue Aufgabe anlegen"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input
            className="btn add-task__submit"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
  }
}

export default TaskListAddItem;
