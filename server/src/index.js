"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config(); // import dotenv
var express_1 = require("express"); // import express
var config_1 = require("config"); // import config
var connectToDb_1 = require("./utils/connectToDb"); // import utility for connecting to MongoDB
var cors_1 = require("cors"); // Import the cors middleware
var logger_1 = require("./utils/logger"); // for logging errors to the console
var routes_1 = require("./routes"); // import routes for the app
var deserializeUser_1 = require("./middleware/deserializeUser"); // middleware to handle accessing user data for authentication
// import { connectDB } from "./services/database.service";
// import { gamesRouter } from "./routes/games.routes";
var app = (0, express_1.default)(); // initialize new app instance;
app.use(express_1.default.json()); // use JSON objects in the app to represent & transmit data
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(deserializeUser_1.default);
app.use(routes_1.default); // use routes defined in main route index file
var port = config_1.default.get("port");
var key = config_1.default.get("accessTokenPrivateKey");
app.listen(port, function () {
    (0, connectToDb_1.default)();
    logger_1.default.info("App started at http://localhost:".concat(port, ", key is ").concat(key));
});
