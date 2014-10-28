var express = require('express'),
    session = require('express-session'),
    Mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    port = 8335,
    app = express(),
    request = require('request');

var passport = require('passport'),
    auth = require('./lib/auth/auth'),
    isAuth = require('./lib/auth/isAuthenticated');

Mongoose.connect('mongodb://localhost/blog');
app.listen(port, function(){
    console.log("Listening on "+port);
});

app.use(session({secret: "banapple"}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/bower_components'));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(auth.TwitStrat);
app.get('/auth/twitter', auth.TwitAuth);
app.get('/auth/twitter/callback', auth.TwitAuth, function(req, res) {
    res.end();
});
passport.use(auth.FacebookStrat);
app.get('/auth/facebook', auth.FacebookAuth);
app.get('/auth/facebook/callback', auth.FacebookAuth, function(req, res) {
    console.log(req.session);
    res.end();
});
passport.use(auth.GoogleStrat);
app.get('/auth/google', auth.GoogleAuth);
app.get('/auth/google/callback', auth.GoogleAuth, function(req, res) {
    console.log(req.session);
    res.end();
});

app.get('/check', function(req, res){
    res.status(200).json(req.user);
});

app.get('/location', function(req, res){
    var lat = req.query.lat;
    var long = req.query.long;
    request.get('http://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon='+long+'&zoom=18&addressdetails=1', function(error, response, body){
        if(!error){
            var parseBody = JSON.parse(body);
            res.status(200).json(parseBody);
        }
        else {
            res.status(418).json(error);
        }
    })
});

app.get('/weather', function(req, res){
    var city = req.query.city,
        state = req.query.state,
        key = '4b6fe49c7e538d6c';
    request.get('http://api.wunderground.com/api/' + key + '/conditions/q/' + state + '/' + city + '.json', function(err, response, body){
        if(!err){
            var parsedBody = JSON.parse(body);
            res.status(200).json(parsedBody);
        }
    })
});
