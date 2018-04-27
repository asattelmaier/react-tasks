import React from 'react';

const Task = () => (
  <div className="grocery-item row">
    <div className="six columns">
      <h4 className={this.props.task.done ? 'strikethrough' : ''}>
        {this.props.task.content}
      </h4>
    </div>
  </div>);

module.exports = Task;
