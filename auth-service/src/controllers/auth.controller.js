const authService = require("../services/auth.service");

exports.signOn = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username) {
    res.status(400).json({ error: "missing username!", code: "01400" });
    return false;
  }
  if (!password) {
    res.status(400).json({ error: "missing password!", code: "02400" });
    return false;
  }
  return await authService.signOn(res, username, password);
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.status(400).json({ error: "missing refreshToken!", code: "01400" });
    return false;
  }
  return await authService.refreshToken(res, refreshToken);
};

exports.revoke = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.status(400).json({ error: "missing refreshToken!", code: "01400" });
    return false;
  }
  return await authService.revokeToken(res, refreshToken);
};
