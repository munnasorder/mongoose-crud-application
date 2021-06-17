const express = require('express');
const dotenv = require('dotenv')
const port = 3000;
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

// initialize application
const app = express();
dotenv.config();
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
app.use('/todo', todoHandler);
app.use('/user', userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSend) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})