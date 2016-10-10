const PORT = 8000,
      cors = require('cors'),
      path = require('path'),
      morgan = require('morgan'),
      express = require('express'),
      webpack = require('webpack'),
      bodyParser = require('body-parser'),
      webpackConfig = require('./webpack.config'),
      todoHandlers = require('./models/todoHandlers.js'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware')

//Express invocation
const app = express()

//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Webpack Configuration
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))
app.use(webpackHotMiddleware(compiler))


//Get a list of all Todos
app.get('/todos', (req, res) => {
  let queries = req.query
  console.log('I am the query', queries)
  todoHandlers.getAndFilterTodos(queries, (err, allToDos) => {
    if(err) {
      return res.status(400).send(err)
    }
    res.send(allToDos)
  })
})

//Create a new todo
app.post('/todos', (req, res) => {
  todoHandlers.createToDo(req.body, err => {
    if(err) return res.status(400).send(err);
    res.send({success: true});
  })
})

//Edit Todo's Status
app.put('/todos/:id', (req, res) => {
  let id = req.params.id
  todoHandlers.editToDo(id, (err) => {
    if(err) return res.status(404).send(err)
  })
  res.send({success: true})
})

//Delete all complete todos 
app.delete('/todos/complete', (req, res) => {
  todoHandlers.deleteCompleted((err, remainingTodos) => {
    if(err) return res.status(404).send(err)
  res.send(remainingTodos)
  })
})

//Delete a single todo 
app.delete('/todos/:id', (req, res) => {
  let deleteID = req.params.id
  todoHandlers.deleteToDo(deleteID, (err) => {
    if(err) return res.status(404).send(err)
  })
  res.send(`ToDo ${deleteID}, was deleted from your deck`)
})

app.listen(PORT, err => {
  console.log( err || `Express listening on port ${8000}`)
})