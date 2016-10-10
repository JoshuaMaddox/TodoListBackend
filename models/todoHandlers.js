const fs = require('fs'),
      path = require('path'),
      uuid = require('uuid')
      todos = path.join(__dirname, '../data/todo.json')

//Get all ToDos in a Readable Format
exports.getAllToDos = function(cb){
  fs.readFile(todos, (err, buffer) => {
    if(err) return cb(err)
      try{
        var allToDos = JSON.parse(buffer)
      } catch(e) {
        var allToDos = []
      }
      cb(null, allToDos)
  })
}

//Write whatever is fed in to JSON
exports.write = function(newData, cb) {
  let json = JSON.stringify(newData)
  fs.writeFile(todos, json, cb)
}

//Get All todos and also filter results if requested
exports.getAndFilterTodos = function(completionStatus, cb) {
  let filterdToDos;
  console.log('I am completionStatus: ', completionStatus)
  if(completionStatus.complete){
    console.log("I've been skipped")
    exports.getAllToDos((err, allToDos) => {
      filterdToDos = allToDos.filter((todo) => {
        if(completionStatus.complete == todo.status.toString()){
          return todo
        } else {
          return
        }
      })
    cb(null, filterdToDos) 
    })
  }
  else {
    exports.getAllToDos((err, allToDos) => {
      console.log('I am allToDos', allToDos)
      filterdToDos = allToDos
    cb(null, filterdToDos)
    })
  }
}

//Creat a new ToDo
exports.createToDo = function(newToDo, cb) {
  exports.getAllToDos((err, todo) => {
    if(err) return cb(err)
    newToDo.id = uuid()
    newToDo.status = false
    console.log('I am the newToDo', newToDo) 
    todo.push(newToDo)
    exports.write(todo, cb)
  })
}

//Update a ToDo's Status
exports.editToDo = function(id, cb) {
  exports.getAllToDos((err, ToDos) => {
    if(err) return cb(err)
    let editedToDos = ToDos.map((todo, index) => {
      if(id === todo.id) {
        todo.status = !todo.status
        return todo
      } else {
        return todo
      }
    })
    exports.write(editedToDos)
  })
}

//Delete toDo by ID
exports.deleteToDo = function(deleteID, cb) {
  exports.getAllToDos((err, todos) => {
    if(err) return cb(err)
    let newToDos = todos.filter((todo, index) => {
      if(deleteID !== todo.id){
        return todo
      } 
    })
    exports.write(newToDos)  
  })
  cb()
}

//Delete all Completed Todos
exports.deleteCompleted = function(cb) {
  exports.getAllToDos((err, todos) => {
    if(err) return cb(err)
    let remainingToDos = todos.filter((todo) => {
      if(!todo.status){
        return todo
      } 
    })
    exports.write(remainingToDos)  
  cb(remainingToDos)
  })
}
