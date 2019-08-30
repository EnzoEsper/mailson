const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// make a piece of information (and pass to the browser in a cookie) that allows it to identify for follow up request to the server
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// take the piece of information that comes from the browser related to a user and turn it back to a user at some point in the future
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accesToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // we already have a record with the given profile id
        done(null, existingUser);
      } else {
        // we dont have a user record with this id -> make a new record in the DB
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);
