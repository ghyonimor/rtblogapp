'use strict';

/**
 * Load modules
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

// Create the initial posts data file
var postsPath = require('./modules/data');

// Init a new Express app instance
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// Set the app port (used at the end with `listen`)
app.set('port', 3000);

/**
 * Define Middleware handlers
 * These run on every request
 */

// Request's body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Define Routes handling
 */

// On root, serve `public/index.html`
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Handle POST request to save a new post data
app.post('/posts', function (req, res) {
	console.log(req.method, req.path, req.body);

	fs.readFile(postsPath, function (err, data) {
		if (err) {
			console.log(err);
			return res.status(501).send(null);
		}

		data = JSON.parse(data);
		// TODO: Test if already exists and return error code.
		if (req.body.type === 'new') {
			data.posts.push(req.body.post);
		} else if (req.body.type === 'edit') {
			data.posts[req.body.index] = req.body.post;
		} else if (req.body.type === 'delete') {
			data.posts.splice(req.body.index, 1);
		}

		fs.writeFile(postsPath, JSON.stringify(data), function () {
			res.status(201);
			res.send(req.body);
		});
	});
});

// Handle GET request to get all posts data
app.get('/posts', function (req, res) {
	// Get all posts data
	fs.readFile(postsPath, function (err, data) {
		if (err) {
			console.log(err);
			// Tell the client there was an error by sending back `null`
			return res.status(501).send(null);
		}

		// Send the data back to the client
		res.send(data);
	});
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('load post', function(post){
    console.log('post: ' + post);
    io.emit('load post', post);
  });
});

// Start the server at a specific port
http.listen(app.get('port'));

console.log('Listening on: http://localhost:3000');
