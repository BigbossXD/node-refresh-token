const config = require("../configs/service/service.config");
const jwt = require("jsonwebtoken");

const accessTokenVerify = function (req, res, next) {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    res
      .status(403)
      .json({ error: "Unauthenticate accessToken! Request accessToken!" });
    return false;
  } else {
    jwt.verify(accessToken, config.JWTKEY, (err, value) => {
      if (err) {
        res.status(500).json({ error: "failed to authenticate accessToken" });
      } else {
        next();
      }
    });
  }
};

module.exports = accessTokenVerify;
