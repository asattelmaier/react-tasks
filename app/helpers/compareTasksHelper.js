function compareTasksHelper(tasksLocal, tasksOnline, resolve) {
  const onlineTasks = tasksOnline;
  const localTasks = tasksLocal;
  const mergeTasks = [];

  let smallerTasks;
  let biggerTasks;

  if (onlineTasks.length > localTasks.length) {
    biggerTasks = onlineTasks;
    smallerTasks = localTasks;
  } else {
    biggerTasks = localTasks;
    smallerTasks = onlineTasks;
  }

  const areIdsEqual = (a, b) => a._id === b._id;
  const isVersionNewer = (a, b) => a.__v >= b.__v;
  const clearedTask = 'cleared';

  for (let i = 0; i < biggerTasks.length; i += 1) {
    for (let y = 0; y < smallerTasks.length; y += 1) {
      if (areIdsEqual(biggerTasks[i], smallerTasks[y])) {
        if (isVersionNewer(biggerTasks[i], smallerTasks[y])) {
          mergeTasks.push(biggerTasks[i]);
        } else {
          mergeTasks.push(smallerTasks[y]);
        }
        // remove Task because it's already merged
        smallerTasks.splice(y, 1);
        biggerTasks[i] = clearedTask;
        break;
      }
    }

    // if not cleared, it's not jet merged
    if (biggerTasks[i] !== clearedTask) {
      mergeTasks.push(biggerTasks[i]);
      biggerTasks[i] = clearedTask;
    }
  }

  // finally, push remaining smallerTasks if exists
  for (let y = 0; y < smallerTasks.length; y += 1) {
    mergeTasks.push(smallerTasks[y]);
  }

  return resolve(mergeTasks);
}

export default compareTasksHelper;
