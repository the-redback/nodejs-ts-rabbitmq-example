import * as amqp from 'amqplib';

const AMQP_URL = process.env.AMQP_URL || 'amqp://@localhost:5672';

let connection: amqp.Connection;
let channel: amqp.Channel;

async function ensureConnection() {
  if (!connection) {
    connection = await amqp.connect(AMQP_URL);
  }
  if (!channel) {
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');

    // worker will get new task sequentially only after ack-ing previous on
    // Use depending on use case
    // channel.prefetch(1);
  }
}

async function ensureQueue(queueName: string) {
  if (!connection || !channel) {
    await ensureConnection();
  }
  await channel.assertQueue(queueName, {durable: true});
}

async function consumeMsg(queueName: string, callback: Function) {
  await ensureQueue(queueName);
  let parsedMsg: string | undefined;
  channel.consume(
    queueName,
    (msg: amqp.Message | null) => {
      if (!msg) {
        return;
      }
      parsedMsg = JSON.parse(msg.content.toString());

      if (typeof callback === 'function') {
        callback(parsedMsg, () => channel.ack(msg)); // ack as callback of callback function
      }
    },
    {noAck: false}
  );
  return parsedMsg;
}

async function SimpleConsumer(queueName: string) {
  consumeMsg(queueName, (msg: string, ack_cb: Function) => {
    console.log(' [x] Received %s', msg);
    ack_cb(); // callback for acknowledging value
  });
}

function WorkerConsumer(queueName: string) {
  consumeMsg(queueName, (msg: string, ack_cb: Function) => {
    console.log(' [x] Received %s', msg);

    const secs = msg.split('.').length - 1;

    console.log(' [x] Starting task');
    setTimeout(() => {
      console.log(' [x] Done');
      ack_cb();
    }, secs * 1000);
  });
}

export {ensureQueue, SimpleConsumer, WorkerConsumer};
