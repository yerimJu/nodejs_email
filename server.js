var express = require('express');
var app = express();

const port = 3000;

// set ejs file as view
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('view');
});

app.listen(port, function () {
    console.log('server is listening to http://localhost:' + port);
});