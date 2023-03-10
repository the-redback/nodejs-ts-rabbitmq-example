import * as amqp from 'amqplib';

let connection: amqp.Connection;
let channel: amqp.Channel;

async function ensureConnection() {
  if (!connection) {
    connection = await amqp.connect('amqp://localhost:5672');
  }
  if (!channel) {
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
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
      console.log(' [x] Received %s', parsedMsg);

      if (typeof callback !== 'undefined') {
        callback(parsedMsg);
      }
    },
    {noAck: true}
  );
  return parsedMsg;
}

async function SimpleConsumer(queueName: string) {
  consumeMsg(queueName, () => true);
}

function WorkerConsumer(queueName: string) {
  consumeMsg(queueName, (msg: string) => {
    const secs = msg.split('.').length - 1;

    console.log(' [x] Starting task');
    setTimeout(() => {
      console.log(' [x] Done');
    }, secs * 1000);
  });
}

export {ensureQueue, SimpleConsumer, WorkerConsumer};
