import * as bodyParser from 'body-parser';
import * as express from 'express';

import {ensureQueue, sendMsg} from './producer';

const PORT = parseInt(String(process.env.PORT), 10) || 3000;
const AMQP_URL = process.env.AMQP_URL || 'amqp://localhost:5672';
const SIMPLE_QUEUE = 'test-queue';
const WORKER_QUEUE = 'wait-and-work';

const app = express();

ensureQueue(SIMPLE_QUEUE);
ensureQueue(WORKER_QUEUE);

app.use(bodyParser.json());

app.post('/login', (req: express.Request, res: express.Response) => {
  const {username, password} = req.body;
  console.log('Login user: ', username, password);
  const msg = {
    action: 'LOGIN',
    data: {username, password},
    time: Date().toString(),
  };
  sendMsg(SIMPLE_QUEUE, JSON.stringify(msg));

  return res.send('OK');
});

app.post('/tasks', (req: express.Request, res: express.Response) => {
  const {msg} = req.body;
  console.log('Receive task: ', msg);
  sendMsg(WORKER_QUEUE, JSON.stringify(msg));

  return res.send('OK');
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.get('/send-msg', (req: express.Request, res: express.Response) => {
  const data = {
    msg: 'Hello from the other side!!',
    time: Date().toString(),
  };

  sendMsg(SIMPLE_QUEUE, JSON.stringify(data));

  console.log('A message is sent to queue');
  res.send('Message Sent');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
