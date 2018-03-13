const express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Todos = require('./server/models/todos.model');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);


mongoose.connect('mongodb://localhost:27017/ifatodo').then(function(success) {
    console.log("la connection à mongodb est OK");

    // config routes statiques
    app.use('/assets', express.static('client/static'));
    app.use('/app', express.static('client/app'));

    // config body parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // start serving index
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/client/index.html'));
    });




    // start api

    // get liste all
    app.get('/api/todos/', function(req, res) {
        Todos.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            } else {
                // io.emit("liste", docs);
                return res.json(docs);

            }
        });
    });
    // post new todo
    app.post('/api/todos', function(req, res) {

        console.log(req.body);
        var newTodo = new Todos(req.body);

        newTodo.save(function(err, success) {
            if (err) {
                return console.log(err);
            } else {
                console.log(success);
                io.emit("newTodo", success);

                res.send(success);

            }
        });

    });
    // delete todo
    app.delete('/api/todos/:id', function(req, res) {
        Todos.findByIdAndRemove(req.params.id, (err, todo) => {
            var response = {
                message: "Todo successfully deleted",
                id: todo._id
            };
            io.emit("deleteTodo", response);
            res.status(200).send(response);
        });
    });
    app.put('/api/todos/:id', function(req, res) {
        Todos.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        }, function(err, objedite) {
            if (err) return handleError(err);
            console.log('The objedite response from Mongo was ', objedite);
            io.emit("updatedTodo", objedite);
            return res.json(objedite);
        });
    });
    // bypass express for angular routes 
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(function() {
            res.status(404);
        });

    // All other routes should redirect to the index.html
    app.route('/*').get(function(req, res) {
        res.sendFile(path.join(__dirname + '/client/index.html'));
    });

    // launch server
    http.listen(3001, "localhost", function(err) {
        if (err) throw err;
        console.log("server running on localhost:3001")

    });

}, function(err) {
    console.log("err")
    console.log(err)
});

io.on('connection', function(socket) {
    // console.log(socket);
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('hello', function(msg) {
        console.log(msg);
        console.log(msg.salut);
        console.log('a user say hello');

    });
    socket.emit('hellofromserver', 'world');

});

// mongoose.connect('mongodb://localhost:27017/testIFA2');

// app.use('/assets', express.static('client/static'));
// app.use('/app', express.static('client/app'));

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.use(bodyParser.json());

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/client/index.html'));
// });
// app.get('/api/liste', function(req, res) {
//     Eleve.find({}, function(err, docs) {
//         if (err) {
//             console.log(err);
//             return res.sendStatus(500);
//         } else {
//              io.emit("liste", docs);
//             return res.json(docs);

//         }
//     });
// });
// app.put('/api/liste/:id', function(req, res) {
//    Eleve.findOneAndUpdate({
//         _id: req.params.id
//     }, req.body, { new: true }, function(err, objedite) {
//         if (err) return handleError(err);
//         console.log('The objedite response from Mongo was ', objedite);
//         io.emit("updateUser", objedite);
//         return res.json(objedite);
//     });
// });
// app.get('/api/liste/:id', function(req, res) {
//     Eleve.findOne({_id : req.params.id}, function(err, docs) {
//         if (err) {
//             console.log(err);
//             return res.sendStatus(500);
//         } else {
//              io.emit("liste", docs);
//             return res.json(docs);

//         }
//     });
// });
// app.delete('/api/liste/:id', function(req, res) {
//     Eleve.findByIdAndRemove(req.params.id, (err, todo) => {
//         var response = {
//             message: "User successfully deleted",
//             id: todo._id
//         };
//         io.emit("deleteUser", response);
//         res.status(200).send(response);
//     });
// });
// app.route('/:url(api|auth|components|app|bower_components|assets)/*')
//     .get(function(){
//         res.status(404);
// });

// // All other routes should redirect to the index.html
// app.route('/*').get(function(req, res) {
//     res.sendFile(path.join(__dirname + '/client/index.html'));
// });

// http.listen(3001);