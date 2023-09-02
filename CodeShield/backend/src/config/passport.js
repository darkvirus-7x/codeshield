const config = require('dotenv').config().parsed
const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const configOauth2 = () => {
        passport.use(new GoogleStrategy({
        clientID: config.CLIENT_ID,
                clientSecret: config.SECRET_KEY,
                callbackURL: "http://localhost:8000/api/google/callback",
                passReqToCallback   : true
        },
        function(request, accessToken, refreshToken, profile, done) {
                return done(null, profile);
        }
        ));
        passport.serializeUser(function(user, done) {
                // console.log(user)
                done(null, user);
        });
        passport.deserializeUser(function(user, done) {
                // console.log(user)
                done(null, user);
        });
}
module.exports = configOauth2