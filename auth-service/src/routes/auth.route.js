const express = require("express");
const router = express.Router();

const authContorller = require("../controllers/auth.controller");

router.post("/sign-on", authContorller.signOn);
router.post("/refresh", authContorller.refreshToken);
router.post("/revoke", authContorller.revoke);

module.exports = router;
