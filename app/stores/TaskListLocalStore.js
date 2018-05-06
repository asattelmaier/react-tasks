function TaskListLocalStore() {
  const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
  const TASK_LIST_LOCAL_STORE = 'taskListLocalStore';
  const TASKS_LOCAL_STORE_NAME = 'tasks';
  const localStoreVersion = 1;

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const indexDBRequest =
        indexedDB.open(TASK_LIST_LOCAL_STORE);

      indexDBRequest.onsuccess = () => {
        resolve(indexDBRequest.result);
      };

      indexDBRequest.onerror = (error) => {
        console.error(error);
        reject();
      };
    });
  }

  function getLocalStore() {
    return new Promise((resolve, reject) => {
      openDatabase()
        .then((localDatabase) => {
          const dbTransaction =
            localDatabase.transaction(
              [TASKS_LOCAL_STORE_NAME],
              'readwrite',
            );

          dbTransaction.onerror = (error) => {
            console.error(error);
          };

          const tasksStore =
            dbTransaction.objectStore(TASKS_LOCAL_STORE_NAME);

          resolve(tasksStore);
        })
        .catch(error => reject(console.error(error)));
    });
  }

  function putTask(task) {
    getLocalStore()
      .then((tasksStore) => {
        tasksStore.put(task);
      })
      .catch(error => console.error(error));
  }

  function deleteTask(task) {
    getLocalStore()
      .then((tasksStore) => {
        tasksStore.delete(task._id);
      })
      .catch(error => console.error(error));
  }

  function getTasks() {
    return new Promise((resolve, reject) => {
      getLocalStore()
        .then((tasksStore) => {
          const currentTaskStore = tasksStore;
          currentTaskStore
            .getAll()
            .onsuccess = (event) => {
              const tasks = event.target.result;
              resolve(tasks);
            };
        })
        .catch(error => reject(console.error(error)));
    });
  }

  function createLocalStore(tasks) {
    const localDatabase = indexedDB.open(
      TASK_LIST_LOCAL_STORE,
      localStoreVersion,
    );

    localDatabase.onupgradeneeded = () => {
      const localDatabaseResult = localDatabase.result;
      localDatabaseResult
        .createObjectStore(TASKS_LOCAL_STORE_NAME, {
          keyPath: '_id',
          autoIncrement: false,
        });
    };

    localDatabase.onsuccess = () => {
      tasks.forEach((task) => {
        putTask(task);
      });
    };

    localDatabase.onerror = (error) => {
      console.error(error);
    };
  }

  function setTasks(tasks) {
    createLocalStore(tasks);
  }

  return {
    putTask,
    getTasks,
    setTasks,
    deleteTask,
    createLocalStore,
  };
}

export default TaskListLocalStore();
