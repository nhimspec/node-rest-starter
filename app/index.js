const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const dotenv = require("dotenv");
const config = require("./config")
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const port = process.env.API_PORT || 3000;

/**
 * Config Express
 * @desc BodyParser
 * @desc CORS
 */
app.use(bodyParser.json(), config.cors);

/**
 * Database Connection
 */
mongoose.connect(process.env.DB_CONNECTION);
if (config.isDev) {
    mongoose.set('debug', true);
}

/**
 * Import Models
 */
require("./models/User")

/**
 * Router
 */
app.use("/api", router);

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;