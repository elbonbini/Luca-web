#!/usr/local/bin/node

/*
 * @file_name: index.js
 *
 */

// Load required packages

var express = require('express'),
   http = require('http'),
   fs = require('fs'),
   bodyParser = require('body-parser'),
   passport = require('passport'),
   multer = require('multer'),
   busboy = require('connect-busboy');


// Create our Express application
var app = express();
var upload = multer();
app.set('port', 3000);
//app.use(express.static('views'));

/*
// Create Express router
var router = express.Router();
*/

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

//app.use(busboy());

// respond to GET with a small piece of HTML
app.get('/', (req, res) => {
   res.sendFile(__dirname + '/views/index.html', (err) => {
      if (err) {
         console.error(err);
         res.status(err.status).end();
      }
   });
});

/*
app.post('/api/loadsheets', function(req, res) {
   var fstream;
   req.pipe(req.busboy);
   req.busboy.on('file', function(fieldname, file, filename) {
      console.log('Uploading ' + filename);
      fstream = fs.createWriteStream(__dirname + '/data/spreadsheets/' + filename);
      file.pipe(fstream);
      fstream.on('close', function() {
         res.send('File uploaded successfully, processing spreadsheet');
      });
   });
});
*/

app.post('/api/loadsheets', upload.array(), function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});
/*
//   console.log(req.query['enterPath']);
   console.log(req.body);
   console.log(req.files);
//   console.log(ctype);
   console.log(upload);
   */



// Start the server
http.createServer(app).listen(app.get('port'), () => {
   console.log('Server listening on port ' + app.get('port'));
});
