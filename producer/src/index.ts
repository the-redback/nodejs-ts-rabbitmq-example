// import bodyParser from 'body-parser';
import * as express from 'express';

import createMQProducer from './producer';

const PORT = parseInt(String(process.env.PORT), 10) || 3000;
const AMQP_URL = process.env.AMQP_URL || 'amqp://localhost:5672';
const QUEUE_NAME = process.env.QUEUE_NAME || 'test-queue';

const app = express();
const producer = createMQProducer(AMQP_URL, QUEUE_NAME);

// app.use(bodyParser.json());

app.post('/register', (req: express.Request, res: express.Response) => {
  const {email, password} = req.body;
  console.log('Registering user...');

  return res.send('OK');
});

app.post('/login', (req: express.Request, res: express.Response) => {
  const {email, password} = req.body;
  console.log('Login user...');

  return res.send('OK');
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.get('/send-msg', (req: express.Request, res: express.Response) => {
  const data = {
    msg: 'Hello from the other side!!',
    time: Date.now(),
  };

  producer(JSON.stringify(data));

  //   sendData(data);

  console.log('A message is sent to queue');
  res.send('Message Sent');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
