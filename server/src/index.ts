require("dotenv").config(); // import dotenv
import express from "express"; // import express
import config from "config"; // import config
import connectToDb from "./utils/connectToDb"; // import utility for connecting to MongoDB
import cors from "cors"; // Import the cors middleware
import log from "./utils/logger"; // for logging errors to the console
import router from "./routes"; // import routes for the app
import deserializeUser from "./middleware/deserializeUser"; // middleware to handle accessing user data for authentication
// import { connectDB } from "./services/database.service";
// import { gamesRouter } from "./routes/games.routes";

const app = express(); // initialize new app instance;
 
app.use(express.json()); // use JSON objects in the app to represent & transmit data;


const corsOptions = {
  origin: 'http://localhost:8080', // frontend URL
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(cors(corsOptions));

app.use(deserializeUser);

app.use(router); // use routes defined in main route index file


const port = config.get("port");
const key = config.get("accessTokenPrivateKey");


app.listen(port, () => {
  connectToDb();
  log.info(`App started at http://localhost:${port}, key is ${key}`);
});

