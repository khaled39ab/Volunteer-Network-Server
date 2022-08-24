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

        app.get('/events', async (req, res) => {
            const query = {};
            const cursor = volunteerCollection.find(query);
            const events = await cursor.toArray();
            res.send(events);
        });

        app.post('/events', async (req, res) => {
            const newEvent = req.body;
            console.log(newEvent);
            const result = await volunteerCollection.insertOne(newEvent);
            res.send(result);
        });
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
