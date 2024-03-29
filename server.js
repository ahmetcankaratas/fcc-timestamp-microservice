// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//mycode
app.get("/api/timestamp/:date_string?", function(req,res,next) {
        req.time = new Date();
        const dateString = req.params.date_string
        if (!isNaN(dateString)) {
        req.date = new Date(parseInt(dateString))} else {
        req.date = new Date(dateString) 
        }
        next();
        }, function (req, res) {
        if(req.params.date_string === undefined) {
          res.send({"unix": req.time.getTime(), "utc": req.time.toUTCString()})
        } else if(req.date.toUTCString() === "Invalid Date") {
          res.send({"error" : "Invalid Date"})
        }
        else {
      res.send({"unix": req.date.getTime(), "utc": req.date.toUTCString()})}
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});