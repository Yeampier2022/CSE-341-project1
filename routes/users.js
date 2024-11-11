const express = require("express");
const router = express.Router();

const users = require("../controllers/users");

router.get("/", users.getUsersAll);

router.get("/:id", users.getUserId);
module.exports = router;