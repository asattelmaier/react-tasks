import Guid from 'guid';

const listeners = {};

const Dispatcher = {
  register: (cb) => {
    const id = Guid.raw();
    listeners[id] = cb;
    return id;
  },
  dispatch: (data) => {
    Object.keys(listeners).forEach((id) => {
      const listener = listeners[id];
      listener(data);
    });
  },
};

export default Dispatcher;
