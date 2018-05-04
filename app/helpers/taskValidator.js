import validator from 'validator';

function taskValidator() {
  const isNotValid = {
    isValid: false,
    notification: 'Your data is invalid.',
  };

  function validateKeys(task) {
    const validTaskKeys = ['__v', '_id', 'content', 'done'];

    Object.keys(task).forEach((key) => {
      if (validTaskKeys.indexOf(key) === -1) {
        return false;
      }

      return true;
    });
  }

  function validateInput(taskContent) {
    if (typeof taskContent !== 'string') {
      return false;
    }

    if (validator.isEmpty(taskContent)) {
      return false;
    }

    return true;
  }

  function validateDone(taskDone) {
    if (typeof taskDone === 'undefined') {
      return true;
    }

    if (typeof taskDone !== 'boolean') {
      return false;
    }

    return true;
  }

  function validateId(taskId) {
    const taskIdLenght = { min: 24, max: 24 };

    if (typeof taskId === 'undefined') {
      return true;
    }

    if (validateInput(taskId) === false) {
      return false;
    }

    if (validator.isLength(taskId, taskIdLenght) === false) {
      return false;
    }

    return true;
  }

  function validateVersionKey(taskVersionKey) {
    if (typeof taskVersionKey === 'undefined') {
      return true;
    }

    if (typeof taskVersionKey !== 'number') {
      return false;
    }

    return true;
  }

  function validateTask(task) {
    if (typeof task !== 'object') {
      return isNotValid;
    }

    if (validateKeys(task) === false) {
      return isNotValid;
    }

    if (validateInput(task.content) === false) {
      return isNotValid;
    }

    if (validateDone(task.done) === false) {
      return isNotValid;
    }

    if (validateId(task._id) === false) {
      return isNotValid;
    }

    if (validateVersionKey(task.__v) === false) {
      return isNotValid;
    }

    return {
      isValid: true,
      notification: 'Your data is valid.',
    };
  }

  return { validateTask };
}

export default taskValidator();
