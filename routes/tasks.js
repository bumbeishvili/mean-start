var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://bumbeishvili:sklerozi@ds157268.mlab.com:57268/bumbeishvili-tasklist', ['tasks']);

//Get all tasks
router.get('/tasks', function (req, resp, next) {
    db.tasks.find(function (err, tasks) {
        if (err) {
            resp.send(err);
        }

        resp.json(tasks);
    })

});


//Get Single Tasks
router.get('/tasks/:id', function (req, resp, next) {

    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            resp.send(err);
        }

        resp.json(task);
    })

});


//Save Task
router.post('/task', function (req, resp, next) {
    var task = req.body;
    if (!task.title || !(task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function (err, task) {
            if (err) {
                resp.send(err);
            }
            resp.json(task);
        })
    }
});


//Delete Task
router.delete('/tasks/:id', function (req, resp, next) {

    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            resp.send(err);
        }

        resp.json(task);
    })

});


//Update
router.put('/tasks/:id', function (req, resp, next) {
    var task = req.body;
    var updatedTask = {};

    if (task.isDone) {
        updatedTask.isDone = task.isDone;
    }

    if (task.title) {
        updatedTask.title = task.title;
    }
    console.log(updatedTask);
    if (!updatedTask) {
        resp.status(400);
        res.json({
            "error": "Bad Data"
        })
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updatedTask, {}, function (err, task) {
            if (err) {
                resp.send(err);
            }

            resp.json(task);
        })
    }
});

module.exports = router;