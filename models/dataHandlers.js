const fs = require('fs'),
      path = require('path'),
      dataBase = path.join(__dirname, '../data/data.json')

//Get all Flashcards in a Readable Format
exports.getCards = function(cb){
  fs.readFile(dataBase, (err, buffer) => {
    if(err) return cb(err)
      try{
        var cards = JSON.parse(buffer)
      } catch(e) {
        var cards = []
      }
      cb(null, cards)
  })
}


//Write whatever is fed in to JSON
exports.write = function(newData, cb) {
  let json = JSON.stringify(newData)
  fs.writeFile(dataBase, json, cb)
}