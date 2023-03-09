import * as bodyParser from 'body-parser';
import * as express from 'express';

import createMQConsumer from './consumer';

const PORT = parseInt(String(process.env.PORT), 10) || 3001;
const AMQP_URL = process.env.AMQP_URL || 'amqp://localhost:5672';
const QUEUE_NAME = process.env.QUEUE_NAME || 'test-queue';

const app = express();
const consumer = createMQConsumer(AMQP_URL, QUEUE_NAME);

consumer();
app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
