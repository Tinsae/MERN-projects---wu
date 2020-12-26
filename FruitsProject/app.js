const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb://localhost:27017/?poolSize=20&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
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
run().catch(console.dir);