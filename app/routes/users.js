const express = require("express");
const UserController = require("./../controllers/UserController");

const router = express.Router();
router.get("/", UserController.index);

module.exports = router;
