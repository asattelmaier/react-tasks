import Task from './../models/Task.js';
import taskValidator from './../../app/helpers/taskValidator.js';

export default function (app) {
  app.route('/api/tasks/get')
    .get((req, res) => {
      Task.find((error, tasks) => res.send(tasks));
    });

  app.route('/api/tasks/create')
    .post((req, res) => {
      const requestTasks = req.body;

      for (let i = 0; i < requestTasks.length; i += 1) {
        const { isValid, notification } =
          taskValidator.validateTask(requestTasks[i]);

        if (isValid) {
          const newTask = new Task(requestTasks[i]);
          newTask.save();
        } else {
          res.status(503).send(notification);
          break;
        }
      }

      res.status(200).send();
    });

  app.route('/api/task/create')
    .post((req, res) => {
      const requestTask = req.body;

      const { isValid, notification } =
          taskValidator.validateTask(requestTask);

      if (isValid) {
        const newTask = new Task(requestTask);
        newTask.save();
        res.status(200).send();
      } else {
        res.status(503).send(notification);
      }
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
