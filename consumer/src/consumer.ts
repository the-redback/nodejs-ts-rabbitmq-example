import * as amqp from 'amqplib/callback_api';

const createMQConsumer = (amqpURl: string, queueName: string) => {
  console.log('Connecting to RabbitMQ...');
  return () => {
    amqp.connect(amqpURl, (errConn, conn) => {
      if (errConn) {
        throw errConn;
      }

      conn.createChannel((errChan, chan) => {
        if (errChan) {
          throw errChan;
        }

        console.log('Connected to RabbitMQ');
        chan.assertQueue(queueName, {durable: true});
        chan.consume(
          queueName,
          (msg: amqp.Message | null) => {
            if (msg) {
              const parsedMsg = JSON.parse(msg.content.toString());
              console.log('Received MSG: ', parsedMsg);
            }
          },
          {noAck: true}
        );
      });
    });
  };
};

export default createMQConsumer;
