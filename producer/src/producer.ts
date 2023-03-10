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

async function sendMsg(queueName: string, msg: string) {
  console.log('Produce message to RabbitMQ...');
  channel.sendToQueue(queueName, Buffer.from(msg), {persistent: true});
}

export {ensureQueue, sendMsg};
