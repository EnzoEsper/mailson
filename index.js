const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

// connecting to mongoDB using mongoose
mongoose.connect(keys.mongoURI);

const app = express();

// enabling cookies inside of our app, and telling passport to use cookies to manage uor authentication
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// inmediately calls the functions exported from the authRoutes file with the app ass argument
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
// heroku inject the env variable PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT);
