# Dapr Two-Phase Commit for Event and State Sample

This sample shows a two-phase commit flow for receiving an event using an input binding, and acknowledging it only if it was persisted to storage.
If a failure to deliver the event has occured, state will not be written, and if there was a failure writing to state, the message will be dropped.

This example uses Azure Service Bus Queues for the event delivery and Redis as the state store.

*Note: In Dapr 0.5.0, failed binding events will be requeued for delivery until considered poison, and then dropped*

## Quick Start

Prerequisites:

1. [Dapr CLI](https://github.com/dapr/cli#installing-dapr-cli)
2. [Node](https://nodejs.org/en/download/)

### Install Dapr

```
dapr init
```

### Install NPM dependencies

```
npm i
```

### Create an Azure Service Bus Queue

See [these](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-quickstart-portal) instructions on how to create an Azure Service Bus Queue.
Once the Service Bus instance has been created, create a new queue named `queue1`.

After the queue is created, obtain the connection string for it and put it in `./components/asb_queues.yaml` and `queue_sender.js`.

### Run Dapr

```
dapr run --app-id flowdemo --app-port 3000 node app.js 
```

### Send a message to the queue

```
node queue_sender.js
```

Take a look at `app.js` and see the comments about the ways Dapr will behave based on the returned status codes from the app.
