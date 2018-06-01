import React from 'react';
import PropTypes from 'prop-types';

function getCurrentDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  today = `${dd}.${mm}.${yyyy}`;

  return today;
}

function TaskCounter(props) {
  return (
    <header className="task-counter">
      <div className="task-counter__tasks">
        Offene Aufgaben:
        &nbsp;
        <strong>{props.numberOpen}</strong>
        &nbsp;
        Erledigte Aufgaben:
        &nbsp;
        <strong>{props.numberDone}</strong>
      </div>
      <div className="task-counter__date">
        {getCurrentDate()}
      </div>
    </header>
  );
}

TaskCounter.propTypes = {
  numberOpen: PropTypes.number,
  numberDone: PropTypes.number,
};

TaskCounter.defaultProps = {
  numberOpen: 0,
  numberDone: 0,
};

export default TaskCounter;
