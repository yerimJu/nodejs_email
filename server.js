const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

const port = 3000;
var USER_NAME = 'Yerim';


// set body parser
// https://stackoverflow.com/questions/24543847/req-body-empty-on-posts
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// set router
app.use('/', require('./routes'));

// set static files
app.use('/static', express.static(__dirname + '/public'));

// set ejs file as view
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('view');
});

app.get('/upload', function (req, res) {
    // send username
    res.render('video', {username: USER_NAME});
});

app.listen(port, function () {
    console.log('server is listening to http://localhost:' + port);
});