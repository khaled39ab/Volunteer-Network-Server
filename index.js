const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.volunteer_user}:${process.env.volunteer_password}@cluster0.eevembd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("volunteerNetwork").collection("member");
    // perform actions on the collection object
    console.log('db connected');
    client.close();
});


app.get('/', (req, res) => {
    res.send('Hello Volunteer network server')
});

app.listen(port, () => {
    console.log("Server running ", port);
});
