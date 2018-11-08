const express = require("express");
const users = require("./users");
const articles = require("./articles");
// Midlewares
const TokenAuth = require("./../middleware/TokenAuth");

const router = express.Router();

router.use("/users", TokenAuth, users);
router.use("/articles", articles);

module.exports = router;
