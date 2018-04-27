import Express from 'express';
import path from 'path';
// Parse incoming request bodies
// import bodyParser from 'body-parser';

const app = new Express();

app.get('/', (req, res) => {
  res.render('./../app/pages/index.ejs', {});
})
  .use(Express.static(path.join(__dirname, '/../dist')))
  .listen(7777);
