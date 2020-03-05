const express = require('express')
var bodyParser = require('body-parser')
require('isomorphic-fetch')
const app = express()
app.use(bodyParser.json());

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const stateStoreName = `statestore`;
const stateUrl = `http://localhost:${daprPort}/v1.0/state/${stateStoreName}`;
const port = 3000

app.post('/queue1', (req, res) => {
    // Event received
    console.log(req.body);

    const state = [{
        key: "key1",
        value: req.body
    }];

    // Save state
    fetch(stateUrl, {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if (!response.ok) {
            // Failed to save state, fail the event delivery
            // Dapr will abandon the messsage, and the entire flow will have been cancelled
            res.status(500).send({ message: "Failed to persist state" });
            return
        }

        // Save state successful, returning 200 OK to Dapr will ack the message
        // Change the status code to 500 to have Dapr abandon the message
        console.log("Successfully persisted state.");
        res.status(200).send();
    }).catch((error) => {
        // Failed to save state, fail the event delivery
        // Dapr will abandon the messsage, and the entire flow will have been cancelled
        res.status(500).send({ message: error });
    });
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
