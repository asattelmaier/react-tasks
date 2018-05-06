import taskValidator from './../helpers/taskValidator.js';

class Task {
  constructor(__v, _id, content, done) {
    this.__v = Task.normalizeVersion(__v);
    this._id = Task.normalizeId(_id);
    this.content = content;
    this.done = Task.normalizeDone(done);
  }

  getValues() {
    const taskValues = {
      __v: this.__v,
      _id: this._id,
      content: this.content,
      done: this.done,
    };

    const { isValid, notification } =
      taskValidator.validateTask(taskValues);

    if (isValid === false) {
      throw new Error(notification);
    }

    return taskValues;
  }

  incrementVersion() {
    this.__v += 1;
  }

  static normalizeVersion(__v) {
    const defaultVersion = 0;

    if (typeof __v === 'undefined') {
      return defaultVersion;
    }

    return __v;
  }

  static normalizeId(_id) {
    if (typeof _id === 'undefined') {
      return this.mongoObjectId();
    }

    return _id;
  }

  static normalizeDone(done) {
    if (typeof done === 'undefined') {
      return false;
    }

    return done;
  }

  static mongoObjectId() {
    const timestamp = Math.floor(Date.now() / 1000);
    const randHelper = () => Math.floor(Math.random() * 16);
    let randomString = 'xxxxxxxxxxxxxxxx';
    randomString = randomString.replace(/[x]/g, () => randHelper().toString(16));
    randomString = randomString.toLowerCase();

    return (timestamp).toString(16) + randomString;
  }
}

export default Task;
