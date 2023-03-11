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
