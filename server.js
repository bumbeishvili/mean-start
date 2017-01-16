var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = process.env.PORT || 3000;
var app = express();


//View Engine

app.set('views', path.join(__dirname, 'views'));

app.set('vieww engine', 'ejs');
app.engine('html', require('ejs').renderFile);


//Set Static Folder
var staticFilesPath = express.static(path.join(__dirname, 'client'));
app.use(staticFilesPath);


//Body Parse MD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', tasks);


app.listen(port, function () {
    console.log('server started on port ' + port);
})

