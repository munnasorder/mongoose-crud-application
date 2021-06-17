const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE Todos
router.get('/', (req, res) => {
    Todo.find({status: 'active'})
    .select({
        _id: 0,
        date: 0,
        __v: 0,
    })
    .limit(2)
    .exec((err, docs) => {
        if (err) {
            res.status(500).json({
                error: 'there was an server site error'
            })
        } else {
            res.status(200).json({
                data: docs,
                message: 'success!'
            })
        }
    })
})

// GET A TODO By id
router.get('/:id', (req, res) => {
    Todo.find({_id: req.params.id}, (err, docs) => {
        if (err) {
            res.status(500).json({
                error: 'there was an server site error'
            })
        } else {
            res.status(200).json({
                data: docs,
                message: 'success'
            })
        }
    })
})

// POST TODO
router.post('/', (req, res) => {
    const newTodo = new Todo(req.body);
    newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: 'there was an server site error'
            })
        } else {
            res.status(200).json({
                message: 'todo saved successfully'
            })
        }
    })
})

// POST MULTIPLE TODO
router.post('/all', (req, res) => {
    Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: 'there was an server site error'
            })
        } else {
            res.status(200).json({
                message: 'todos saved successfully'
            })
        }
    })
})

// PUT TODO
router.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
           status: 'active' 
        },
    },
    {
        new: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err) {
            res.status(500).json({
                error: "there was an server site error"
            })
        } else {
            res.status(200).json({
                message: "todo updated successfully"
            })
        }
    })
})

// DELETE TODO
router.delete('/:id', (req, res) => {
    Todo.deleteOne({_id: req.params.id}, (err) => {
        if (err) {
            res.status(500).json({
                error: 'there was an server site error'
            })
        } else {
            res.status(200).json({
                message: 'todo deleted successfully'
            })
        }
    })
})


module.exports = router;
