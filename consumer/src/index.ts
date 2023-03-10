import * as bodyParser from 'body-parser';
import * as express from 'express';
import {ensureQueue, SimpleConsumer, WorkerConsumer} from './consumer';

const PORT = parseInt(String(process.env.PORT), 10) || 3001;
const AMQP_URL = process.env.AMQP_URL || 'amqp://localhost:5672';
const SIMPLE_QUEUE = 'test-queue';
const WORKER_QUEUE = 'wait-and-work';

const app = express();

ensureQueue(SIMPLE_QUEUE);
ensureQueue(WORKER_QUEUE);

SimpleConsumer(SIMPLE_QUEUE);
WorkerConsumer(WORKER_QUEUE);

app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
