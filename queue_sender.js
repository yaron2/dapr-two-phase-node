const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = "";
const queueName = "queue1";

const sbClient = ServiceBusClient.createFromConnectionString(connectionString);
const queueClient = sbClient.createQueueClient(queueName);
const sender = queueClient.createSender();

const message = {
  body: { text: "Hellooooo Dapr" },
  label: `test`,
};

console.log(`Sending message: ${message.body}`);
sender.send(message).then(() => {
  console.log("Message sent");

  queueClient.close().then(() => {})
  sbClient.close().then(() => {})
});

