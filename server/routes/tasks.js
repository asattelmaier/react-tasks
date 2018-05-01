import Task from './../models/Task.js';

export default function (app) {
  // TODO: error Handling
  app.route('/api/tasks/get')
    .get((req, res) => {
      Task.find((error, tasks) => res.send(tasks));
    });

  app.route('/api/tasks/create')
    .post((req, res) => {
      const requestTask = req.body;
      const newTask = new Task(requestTask);
      newTask.save(() => res.status(200).send());
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

  app.route('/api/tasks/update')
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

            updatedTask.save();
            res.status(200).send();
          }
        },
      );
    });
}
