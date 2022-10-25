const config = require("../configs/service/service.config");
const serviceAuthen = function (req, res, next) {
  const APIKEY = config.APIKEY;
  const token = req.headers["x-api-key"];
  if (!token) {
    res
      .status(403)
      .json({ error: "Unauthenticate! Request X API KEY!", code: "01403" });
    return false;
  }
  if (APIKEY != token) {
    res
      .status(403)
      .json({ error: "Unauthenticate Invalid X API KEY!", code: "02403" });
    return false;
  }
  next();
};

module.exports = serviceAuthen;
