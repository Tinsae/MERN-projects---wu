const { MongoClient } = require("mongodb");


const uri = "mongodb://localhost:27017/?poolSize=20&w=majority"; 
// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connect(){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
    } catch (e) {
        console.error(e);
    }
}

async function insert() {
    try {
        const database = client.db("fruitsDB");
        const collection = database.collection("fruits");
        const fruits = [
            {
                name: "Apple",
                score: 8,
                review: "Great fruit"
            },
            {
                name: "Orange",
                score: 6,
                review: "Kinda sour"
            },
            {
                name: "Banana",
                score: 9,
                review: "Great stuff!"
            }
        ];
        // prevents additional documents from being inserted if one fails
        const options = { ordered: true };
        const result = await collection.insertMany(fruits, options);
        console.dir(result);
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function select() {
    try {
        const database = client.db("fruitsDB");
        const collection = database.collection("fruits");
        const query = {};
        const options = {
            sort: { name: 1 },
            projection: { _id: 0, name: 1, score: 1, review: 1 },
        };
        const cursor = collection.find(query, options);
        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }
        await cursor.forEach(console.dir);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
// insert().catch(console.dir);
connect().then(select().catch(console.dir));
