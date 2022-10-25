const config = {
  PORT: 8881,
  DATABASE_HOST: "localhost",
  DATABASE_USERNAME: "root",
  DATABASE_PASSWORD: "12345678",
  DATABASE_DB: "test_auth",
  REDIS_URL: "redis://localhost:6379",
  APIKEY: "THIS_IS_YOUR_API_KEY",
  JWTKEY: "THIS_IS_YOUR_JWT_KEY",
  JWTKEY_EXPIRE: "1m",
  REFRESH_TOKEN_KEY: "THIS_IS_YOUR_REFRESH_TOKEN_KEY",
  REFRESH_TOKEN_EXPIRE: "1D",
};

// host: "host.docker.internal",

module.exports = config;
