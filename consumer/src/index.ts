import * as bodyParser from 'body-parser';
import * as express from 'express';
import {AddressInfo} from 'node:net';
import {ensureQueue, SimpleConsumer, WorkerConsumer} from './consumer';

const PORT = parseInt(String(process.env.PORT), 10) || 0;

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

const server = app.listen(PORT, () => {
  const {port} = server.address() as AddressInfo;
  console.log(`Server is running on http://localhost:${port}/`);
});
