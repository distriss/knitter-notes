const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const logger = require("morgan");
const connectDB = require("./config/database");


// use .env in config
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport)