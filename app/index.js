const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");

const app = express();
const port = process.env.API_PORT || 3000;

app.use(bodyParser.json());

app.use("/api", router);

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
