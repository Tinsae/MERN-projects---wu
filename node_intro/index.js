// const fs = require("fs");
// // File destination.txt will be created or overwritten by default.
// fs.copyFile("file1.txt", "file2.txt", (err) => {
//     if (err) throw err;
//     console.log('file1.txt was copied to file2.txt');
//   });

var superheroes = require("superheroes");
var mySuperheroName = superheroes.random();
console.log(mySuperheroName);