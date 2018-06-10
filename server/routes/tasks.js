import Task from './../models/Task.js';
import taskValidator from './../../app/helpers/taskValidator.js';

export default function (app) {
  app.route('/api/tasks/get')
    .get((req, res) => {
      Task.find((error, tasks) => res.send(tasks));
    });

  function routeTasksCreateResponse(res, tasks) {
    for (let i = 0; i < tasks.length; i += 1) {
      const { isValid, notification } =
        taskValidator.validateTask(tasks[i]);

      if (isValid) {
        const newTask = new Task(tasks[i]);
        newTask.save();
      } else {
        res.status(503).send(notification);
        return;
      }
    }

    res.status(200).send();
  }

  app.route('/api/tasks/create')
    .post((req, res) => {
      const requestTasks = req.body;

      routeTasksCreateResponse(res, requestTasks);
    });

  app.route('/api/task/create')
    .post((req, res) => {
      const requestTask = req.body;

      routeTasksCreateResponse(res, [requestTask]);
    });

  app.route('/api/task/delete')
    .delete((req, res) => {
      const requestTask = req.body;

      Task.findOne({ _id: requestTask._id })
        .remove((err) => {
          if (err) {
            res.status(503)
              .send('Deletion not completed.');
          } else {
            res.status(200).send();
          }
        });
    });

  app.route('/api/task/patch')
    .patch((req, res) => {
      const requestTask = req.body;

      const { isValid, notification } =
          taskValidator.validateTask(requestTask);

      if (isValid) {
        Task.findOne(
          { _id: requestTask._id },
          (err, foundTask) => {
            if (err) {
              res.status(503)
                .send('Update not completed.');
            } else {
              const updatedTask = foundTask;

              Object.keys(requestTask).forEach((key) => {
                updatedTask[key] = requestTask[key];
              });

              updatedTask.save().then(() => {
                res.status(200).send();
              });
            }
          },
        );
      } else {
        res.status(503).send(notification);
      }
    });
}
