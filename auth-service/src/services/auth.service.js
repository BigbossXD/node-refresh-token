const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../configs/database/db.config");
const config = require("../configs/service/service.config");
const userStatus = require("../constants/users.status.constant");
const redis = require("../utils/redis/redis");

exports.signOn = async (res, username, password) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE username = ? and status = ?",
    [username, userStatus.COMPLETED]
  );

  if (rows.length <= 0) {
    return res
      .status(404)
      .json({ error: "username not found!", code: "01404" });
  }

  if (!bcrypt.compare(password, rows[0].password)) {
    return res
      .status(403)
      .json({ error: "password uncorrect!", code: "02403" });
  }
  const accessToken = jwt.sign(
    {
      userId: rows[0].id,
      userStatus: rows[0].status,
      userType: rows[0].type,
    },
    config.JWTKEY,
    {
      expiresIn: config.JWTKEY_EXPIRE,
    }
  );
  const refreshToken = jwt.sign(
    {
      userId: rows[0].id,
    },
    config.REFRESH_TOKEN_KEY,
    { expiresIn: config.REFRESH_TOKEN_EXPIRE }
  );

  await redis.redisSetKeyWithExpire(refreshToken, rows[0].id, 86400);

  const data = { accessToken, refreshToken };
  return res.status(200).json({ code: "00000", data });
};

exports.refreshToken = async (res, refreshTokenRequest) => {
  try {
    jwt.verify(refreshTokenRequest, config.REFRESH_TOKEN_KEY);
  } catch (e) {
    return res
      .status(403)
      .json({ error: "Invalid refreshToken !", code: "01403" });
  }

  const checkRedis = await redis.redisGetKey(refreshTokenRequest);
  if (!checkRedis) {
    return res
      .status(403)
      .json({ error: "refreshToken not found or expired !", code: "01404" });
  }

  const decode = jwt.decode(refreshTokenRequest);
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [
    decode.userId,
  ]);

  if (rows.length <= 0) {
    return res
      .status(404)
      .json({ error: "username not found!", code: "01404" });
  }

  const accessToken = jwt.sign(
    {
      userId: rows[0].id,
      userStatus: rows[0].status,
      userType: rows[0].type,
    },
    config.JWTKEY,
    {
      expiresIn: config.JWTKEY_EXPIRE,
    }
  );
  const refreshToken = jwt.sign(
    {
      userId: rows[0].id,
    },
    config.REFRESH_TOKEN_KEY,
    { expiresIn: config.REFRESH_TOKEN_EXPIRE }
  );

  await redis.redisDeleteKey(refreshTokenRequest);
  await redis.redisSetKeyWithExpire(refreshToken, rows[0].id, 86400);

  const data = { accessToken, refreshToken };

  return res.status(200).json({ code: "00000", data });
};

exports.revokeToken = async (res, refreshTokenRequest) => {
  try {
    jwt.verify(refreshTokenRequest, config.REFRESH_TOKEN_KEY);
  } catch (e) {
    return res
      .status(403)
      .json({ error: "Invalid refreshToken !", code: "01403" });
  }

  const checkRedis = await redis.redisGetKey(refreshTokenRequest);
  if (checkRedis) {
    await redis.redisDeleteKey(refreshTokenRequest);
  }

  return res.status(200).json({ code: "00000", data: {} });
};
