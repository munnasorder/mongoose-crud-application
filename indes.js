const express = require('express');
const port = 3000;
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler')

// initialize application
const app = express();
app.use(express.json())

// connect database
mongoose
.connect('mongodb://localhost/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('connection success'))
.catch(err => console.log(err))

// application routes
app.use('/todo', todoHandler)

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSend) {
        return next(err);
    }
    res.status(500).json({ error: err });
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})