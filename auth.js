var TwitPass = require('passport-twitter').Strategy,
    FacebookPass = require('passport-facebook').Strategy,
    GooglePass = require('passport-google').Strategy,
    passport = require('passport');

module.exports.TwitStrat = new TwitPass({
    consumerKey: 'RGjpHK5bEi5iIOwjNUXzy9JMm',
    consumerSecret: 'BRtkED4p44zosPSnb79dptQaIVx55V0OAVmyOGSdt0RwxfVpb2',
    callbackURL: 'http://127.0.0.1:8335/auth/twitter/callback'
}, function(token, tokenSecret, profile, done) {
    return done(null, profile);
});

module.exports.TwitAuth = passport.authenticate('twitter', {
    successRedirect: '/check',
    failureRedirect: '/'
});
module.exports.FacebookStrat = new FacebookPass({
    clientID: '729728933788054',
    clientSecret: 'dcc737cf6458df91ce87636809148663',
    callbackURL: 'http://localhost:8335/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
    return done(null, profile);
});

module.exports.FacebookAuth = passport.authenticate('facebook', {
    successRedirect: '/check',
    failureRedirect: '/'
});

module.exports.GoogleStrat = new GooglePass({
    clientID: '216060285440-8cub89e7g2cqu5hqarrb6c9gng2kn59h.apps.googleusercontent.com',
    clientSecret: 'bqSZfoLP-4SM36qUQ9_kaZxT',
    returnURL: 'http://localhost:8335/auth/google/callback'
}, function(token, refreshToken, profile, done) {
    return done(null, profile);
});

module.exports.GoogleAuth = passport.authenticate('google', {
    successRedirect: '/check',
    failureRedirect: '/'
});