// modules
import React from 'react';
// actions
import TaskActions from './../actions/TaskActions.jsx';

class TaskListAddItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { input: '' };

    this.changeInputValue = this.changeInputValue.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  changeInputValue(e) {
    this.setState({ input: e.target.value });
  }

  addTask(e) {
    e.preventDefault();

    TaskActions.createTask({ content: this.state.input });

    this.setState({
      input: '',
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addTask}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.changeInputValue}
          />
          <button> Add Item </button>
        </form>
      </div>
    );
  }
}

export default TaskListAddItem;
