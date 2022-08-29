const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.volunteer_user}:${process.env.volunteer_password}@cluster0.eevembd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const volunteerCollection = client.db("VolunteerNetwork").collection("Events");
        const eventCollection = client.db("VolunteerNetwork").collection("joinEvent");

        // get api
        app.get('/events', async (req, res) => {
            const query = {};
            const cursor = volunteerCollection.find(query);
            const events = await cursor.toArray();
            res.send(events);
        });

        //post api
        app.post('/events', async (req, res) => {
            const newEvent = req.body;
            const result = await volunteerCollection.insertOne(newEvent);
            res.send(result);
        });

        app.get('/joinEvent', async (req, res) => {
            const query = {};
            const cursor = eventCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        });

        app.post('/joinEvent', async (req, res) => {
            const joinEvent = req.body;
            const result = await eventCollection.insertOne(joinEvent);
            res.send(result)
        })
    }
    finally {
        // await client.close();

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello Volunteer network server')
});

app.listen(port, () => {
    console.log("Server running ", port);
});
