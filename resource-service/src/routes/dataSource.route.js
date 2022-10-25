const express = require("express");
const router = express.Router();

const dataSourceContorller = require("../controllers/dataSource.controller");

router.get("", dataSourceContorller.getData);

module.exports = router;
