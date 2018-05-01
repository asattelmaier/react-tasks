import Express from 'express';
import path from 'path';
// Parse incoming request bodies
import bodyParser from 'body-parser';

import routeTaks from './routes/tasks.js';
import './database.js';

const app = new Express();

app.get('/', (req, res) => {
  res.render('./../app/pages/index.ejs', {});
})
  .use(Express.static(path.join(__dirname, '/../dist')))
  .listen(7777);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routeTaks(app);
