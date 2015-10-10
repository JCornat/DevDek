var http = require('http');
var url = require('url');
var fs = require('fs');
var queryString = require('querystring');
var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var app = express();

var db = mongoose.model('Test',{name: String});

/*
var article = new articles({name:'Node.js'});
article.save(function(error) {
    if (error) {
        console.log("ERROR");
        console.log(error);
    }
});*/

app.engine('html', handlebars());
app.set('view engine', 'html');
app.set('views', __dirname + '/public/view');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret: 'XXXXXX'}));

app.use(function(req, res, next) {
    if (typeof(req.session.list) == 'undefined') {
        req.session.list = [];
    }
    next();
});

app.get('/', function(req, res) {
    db.find(function(error, articles) {
        res.render('master', {articles: articles});
    })
});

//app.post('/', function(req, res) {
//    req.session.list.push(req.body.name);
//    res.redirect("/");
//});

var server = app.listen(8080);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    //socket.emit('message', 'Client connected');
    //socket.broadcast.emit('message', 'Client connected');
});

//io.sockets.on('new')