import * as bodyParser from 'body-parser';
import * as express from 'express';

import createMQWorker from './consumer';

const PORT = parseInt(String(process.env.PORT), 10) || 3001;
const AMQP_URL = process.env.AMQP_URL || 'amqp://localhost:5672';
const SIMPLE_QUEUE = 'test-queue';
const WORKER_QUEUE = 'wait-and-work';

const app = express();
const consumer = createMQWorker(AMQP_URL, 'test-queue', () => true);
const workers = createMQWorker(AMQP_URL, 'wait-and-work', (msg: string) => {
  const secs = msg.split('.').length - 1;

  console.log(' [x] Received %s', msg.toString());
  setTimeout(() => {
    console.log(' [x] Done');
  }, secs * 1000);
});

consumer();
workers();

app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
