const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

// connecting to mongoDB using mongoose
mongoose.connect(keys.mongoURI);

const app = express();

// middleware to parse the body of the request that comes in to our app
// and assign to the req.body property of the incoming request
app.use(bodyParser.json());
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

// Si se esta en produccion (heroku en este caso)
//
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets (like our main.js or main.css files)
  app.use(express.static("client/build")); // if any request comes in for some route/file/anything and we dont uderstand what to
  //looking for, then look into the client/build directory and try to see if there is some file inside there that matches up with what the request is looking for

  // Express will serve up the index.html file if it doesnt recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    // if someone makes a request for a route that we not understand, just serve the html document
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// heroku inject the env variable PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT);
