const express = require("express");
const cors = require('cors');

require('dotenv').config({path:'./.env'});
const passport = require('passport');
const BnetStrategy = require('passport-bnet').Strategy;

const BNET_ID = process.env.CLIENT_ID;
const BNET_SECRET = process.env.CLIENT_SECRET;
const OAUTH_TOKEN_HOST = process.env.OAUTH_TOKEN_HOST || "https://us.battle.net";
const OAUTH_CALLBACK_URL = process.env.OAUTH_CALLBACK_URL || "http://localhost:3000/oauth/battlenet/callback";

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
    clientID: BNET_ID,
    clientSecret: BNET_SECRET,
    callbackURL: OAUTH_CALLBACK_URL,
    region: "us"
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

app.get('/oauth/battlenet', passport.authenticate('bnet'));
app.get('/oauth/battlenet/callback',
  passport.authenticate('bnet', { failureRedirect: '/' }),
  function(req, res){
      res.redirect('/');
});

app.get('/ouath/test', passport.authenticate('bnet'));

const bnetRoutes = require('./routes/bnetRoutes');

app.use('/bnet', bnetRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});