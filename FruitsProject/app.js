
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

// without validation

// const fruitSchema = new mongoose.Schema({
//     name: String,
//     rating: Number,
//     review: String
// });

// with validation

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required by law"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

// inserting one document: fruit
const Fruit = mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit({
    name: "Apple",
    rating: 37,
    review: "Preety solid as a fruit"
});
// fruit.save();

// inserting one document: person
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    // relationship to fruit: 1 fruit to many people
    favoriteFruit: fruitSchema
});
const Person = mongoose.model("Person", personSchema);
let person = new Person({
    name: "John",
    age: 20
});
const person2 = new Person({
    name: "John",
    age: 40
});

// person.save();
// person2.save();

// inserting multiple documents at once

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 8,
    review: "Nice and healthy"
});

const orange = new Fruit({
    name: "Orange",
    rating: 9,
    review: "Organic orange is expensive"
});

const banana = new Fruit({
    name: "Banana",
    rating: 10,
    review: "one bannana fuels you up for 2 hours"
});


// Fruit.insertMany([kiwi, orange, banana], err => {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Successfully saved fruits to fruitsDB")
//     }
// });

// mogoose find, no filter criteria given
// Fruit.find((err, fruits) =>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         fruits.forEach(fruit => {
//             console.log(fruit.name);
//         });
//     }
//     // if connection is closed no need to do ctrl + c to exit
//     // mongoose.connection.close();
// });


// update
// create a peach without a review
const peach = new Fruit({
    name: "Peach",
    rating: 10
});
// peach.save();

// Fruit.updateOne({ name: "Peach" }, { review: "Tasty peach it is" }).then(result =>{
//     console.log("NModified: " + result.nModified);
// }).catch(console.err);

// another way of writing update
Fruit.updateOne({ name: "Peach" }, { review: "Bad" }, error => {
    if(error){
        console.log('error');
    }
    else{
        console.log("Successfully updated one fruit");
        mongoose.connection.close();
    }
  });


// delete
// Fruit.deleteOne({ name: "Peach" }, error => {
//     if (error) {
//         console.log('error');
//     }
//     else {
//         console.log("Successfully deleted one fruit");
//     }
// });


// delete Many

// Person.deleteMany({name: "John"}, error => {
//     if (error) {
//         console.log('error');
//     }
//     else {
//         console.log("Successfully deleted all Johns");
//     }
// });

// relationships

// Amy's favorite fruit is pineapple

// const pineapple = new Fruit({
//     name: "Pineapple",
//     rating: 4
// });

// pineapple.save();

// const amy = new Person({
//     name: "Amy",
//     age: 23,
//     favoriteFruit: pineapple
// });
// amy.save();

// change john's favorite fruit
Person.updateOne({name: "John"}, {favoriteFruit: banana}, err =>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully updaetd John's favorite fruit");
    }
});



/*********************************************************************************************** */
// The code below is without mongoose

// const { MongoClient } = require("mongodb");
// const url = "mongodb://localhost:27017/?poolSize=20&w=majority"; 
// // Create a new MongoClient
// const client = new MongoClient(url, { useUnifiedTopology: true });

// async function connect(){
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();

//     } catch (e) {
//         console.error(e);
//     }
// }

// async function insert() {
//     try {
//         const database = client.db("fruitsDB");
//         const collection = database.collection("fruits");
//         const fruits = [
//             {
//                 name: "Apple",
//                 score: 8,
//                 review: "Great fruit"
//             },
//             {
//                 name: "Orange",
//                 score: 6,
//                 review: "Kinda sour"
//             },
//             {
//                 name: "Banana",
//                 score: 9,
//                 review: "Great stuff!"
//             }
//         ];
//         // prevents additional documents from being inserted if one fails
//         const options = { ordered: true };
//         const result = await collection.insertMany(fruits, options);
//         console.dir(result);
//         console.log(`${result.insertedCount} documents were inserted`);
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }

// async function select() {
//     try {
//         const database = client.db("fruitsDB");
//         const collection = database.collection("fruits");
//         const query = {};
//         const options = {
//             sort: { name: 1 },
//             projection: { _id: 0, name: 1, score: 1, review: 1 },
//         };
//         const cursor = collection.find(query, options);
//         // print a message if no documents were found
//         if ((await cursor.count()) === 0) {
//             console.log("No documents found!");
//         }
//         await cursor.forEach(console.dir);
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// insert().catch(console.dir);
// connect().then(select().catch(console.dir));
/*********************************************************************************************** */
