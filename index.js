const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.volunteer_user}:${process.env.volunteer_password}@cluster0.eevembd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const volunteerCollection = client.db("volunteerNetwork").collection("event");
        console.log("connected to mongo");

        app.get('/event', async (req, res) => {
            const query = {};
            const cursor = volunteerCollection.find(query);
            if ((await cursor.count()) === 0) {
                alert("No documents found!");
            };
            const events = await cursor.toArray();
            res.send(events);
        });

        app.post('/event', async (req, res) => {

        });
    }
    catch {
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
