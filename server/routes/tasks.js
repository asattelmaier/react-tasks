import validator from 'validator';
import Task from './../models/Task.js';

export default function (app) {
  function generalValidation(req) {
    let isValid = false;

    if (typeof req === 'object') {
      isValid = true;
    }
    console.log('typeof object: ', isValid);

    return isValid;
  }

  function postValidation(content) {
    let isValid = false;

    isValid = validator.isLength(
      content,
      { min: 1, max: 500 },
    );
    console.log('length: ', isValid);

    return isValid;
  }

  app.route('/api/tasks/get')
    .get((req, res) => {
      Task.find((error, tasks) => res.send(tasks));
    });

  app.route('/api/tasks/create')
    .post((req, res) => {
      const requestTasks = req.body;
      let isValid = false;

      isValid = generalValidation(req);

      for (let i = 0; i < requestTasks.length; i += 1) {
        isValid = postValidation(requestTasks[i].content);

        if (isValid) {
          const newTask = new Task(requestTasks[i]);
          newTask.save();
        } else {
          res.status(503)
            .send('Invalid Data.');
          break;
        }
      }

      if (isValid) {
        res.status(200).send();
      }
    });

  app.route('/api/tasks/delete')
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

  app.route('/api/tasks/patch')
    .patch((req, res) => {
      const requestTask = req.body;

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
    });
}
