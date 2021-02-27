//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });
// schema
const itemsSchema = {
  name: String
}
// model
const Item = mongoose.model("Item", itemsSchema);

// schema: an iList has zero or many items ( 1 to many)
const iListSchema = {
  name: String,
  items: [itemsSchema]
}

// model
const iList = mongoose.model("iList", iListSchema);

// docs
const item1 = new Item({
  name: "Welcome to your todolist!"
});
const item2 = new Item({
  name: "Hit the + button to add a new item."
});
const item3 = new Item({
  name: "<-- Hit this to delete an item."
});
const defaultItems = [item1, item2, item3];

// initial page
app.get("/", function (req, res) {
  Item.find({}, (err, foundItems) => {
    if (foundItems.length == 0) {
      Item.insertMany(defaultItems, err => {
        if (err) {
          console.log(err);
        }
        else {
          console.log("Successfully inserted default items");
        }
      });
      res.redirect("/");
    }
    else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

// route parameters: get
app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  if (customListName == "delete") {
    return;
  }
  // if custom list doesn't exist create it and add defaut items to it
  iList.findOne({ name: customListName }, (err, foundList) => {
    if (err) {
      console.log(err);
    }
    // list doesn't exsit
    else if (!foundList) {
      const newList = new iList({
        name: customListName,
        items: defaultItems
      });
      newList.save();
      res.render("list", { listTitle: customListName, newListItems: defaultItems });
    }
    // list exists
    else {
      res.render("list", { listTitle: customListName, newListItems: foundList.items });
    }
  });
});

// works for both default and custom lists
app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const currListTitle = req.body.currListTitle;
  const item = new Item({ name: itemName });
  // if it is default list, add it to default list only
  if (currListTitle == "Today") {
    item.save();
    res.redirect("/");
  }
  // else add it to the custom list
  else {
    iList.findOne({ name: currListTitle }, (err, foundList) => {
      if (err) {
        console.log(err);
      }
      else if (!foundList) {
        res.redirect("/" + currListTitle);
      }
      // list exisits, add item to it
      else {
        // add item to list
        foundList.items.push(item);
        // adds item to the list. the item won't exisit in the items collection,
        // it only exisits inside a custom iList
        foundList.save();
        res.redirect("/" + currListTitle);
      }
    });
  }
});

// works for both default and custom lists
app.post("/delete", (req, res) => {
  const listTitleToDeleteFrom = req.body.listTitleToDeleteFrom;
  const checkedItemId = req.body.itemCheckbox;

  if(listTitleToDeleteFrom == "Today"){
    Item.findByIdAndRemove(checkedItemId, { useFindAndModify: false }, err => {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Deleted-", checkedItemId);
      }
    });
    res.redirect("/");
  }
  else{
    // Condition: find the custom list with currListTitle
    // Update: updates the items array by removing an item with checkedItemId
    // Callback: if no callback is provided it won't execute the update.
    iList.findOneAndUpdate({name: listTitleToDeleteFrom}, {$pull: {items: {_id: checkedItemId}}}, { useFindAndModify: false }, (err, foundList) =>{
      if (!err) {
        res.redirect("/" + listTitleToDeleteFrom);
      }
    });
  }
});


app.get("/about", function (req, res) {
  res.render("about");
});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
