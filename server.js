var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
// define model =====================

var Comment = mongoose.model('Comment', {
    text: String
});
// routes =====================

// api ----------------------------
// get all comments
app.get('/api/comments', function(req, res) {

    // use mongoose to get all todos in the database
    Comment.find(function(err, comments) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(comments); // return all comments in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/comments', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Comment.create({
        text : req.body.text,
        done : false
    }, function(err, comment) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Comment.find(function(err, comments) {
            if (err)
                res.send(err);
            res.json(comments);
        });
    });

});

// delete a todo
app.delete('/api/comments/:comment_id', function(req, res) {
    Comment.remove({
        _id : req.params.comment_id
    }, function(err, comment) {
        if (err) {
            res.send(err);
        }
        // get and return all the todos after you create another
        Comment.find(function(err, comments) {
            if (err) {
                res.send(err);
            }
            res.json(comments);
        });
    });
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");