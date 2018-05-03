import Guid from 'guid';

const registeredFunctions = {};

const Dispatcher = {
  register: (registerFunction) => {
    if (typeof registerFunction === 'function') {
      const id = Guid.raw();
      registeredFunctions[id] = registerFunction;
    }
  },
  dispatch: (taskAction) => {
    Object.keys(registeredFunctions).forEach((id) => {
      registeredFunctions[id](taskAction);
    });
  },
};

export default Dispatcher;
