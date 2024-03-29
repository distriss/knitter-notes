const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session"); 
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const patternRoutes = require("./routes/patterns");
// const counterRoutes = require("./routes/counters");


// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

// Connect to Database
connectDB();

// Using EJS for views
app.set("view engine", "ejs");

// Static Folder
app.use(express.static("public"));

// Body Parsing
app.use(express.urlencoded({ extended: true })); // enables parsing of form entries
app.use(express.json()); 

// Logging
app.use(logger("dev"));

// Use forms for put / delete
app.use(methodOverride("_method")); // if requests have _method query parameter - override it

// Setup Sessions - stored in MongoDB
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: MongoStore.create({
        mongoUrl: process.env.DB_STRING,      
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use flash messages for errors etc
app.use(flash());


// Setup Routes for which the Server is listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/pattern", patternRoutes);
// app.use("/counter", counterRoutes);
// app.use("/direction", directionRoutes);

// Server Running
app.listen(process.env.PORT, () => {
    console.log("Server is running!")
});