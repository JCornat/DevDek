(function () {
    var http = require('http');
    var url = require('url');
    var fs = require('fs');
    var queryString = require('querystring');
    var express = require('express');
    var handlebars = require('express-handlebars');
    var bodyParser = require('body-parser');
    var session = require('cookie-session');
    var mongoose = require('mongoose');
    var db = require(__dirname + '/config/db');

    //Launch server
    var app = express();
    var server = app.listen(8080);

    //Connect to Mongoose
    mongoose.connect(db.url);
    /*
     var article = new articles({name:'Node.js'});
     article.save(function(error) {
     if (error) {
     console.log("ERROR");
     console.log(error);
     }
     });*/

    //Template Engine
    app.engine('html', handlebars());
    app.set('view engine', 'html');
    app.set('views', __dirname + '/public/view');

    //Parse HTTP responses
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //Session
    app.use(session({secret: 'XXXXXX'}));
    app.use(function (req, res, next) {
        if (typeof(req.session.list) == 'undefined') {
            req.session.list = [];
        }
        next();
    });

    //Static files
    app.use('/public', express.static(__dirname + '/public'));
    //app.use('/static', express.static(__dirname + '/public'));

    //Routing
    require(__dirname + '/app/route/api')(app);
    require(__dirname + '/app/route/route')(app);

    //socket.io
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
        //socket.emit('message', 'Client connected');
        //socket.broadcast.emit('message', 'Client connected');
        //io.sockets.connected[socketid].emit();
    });
    //io.sockets.on('new')

})();