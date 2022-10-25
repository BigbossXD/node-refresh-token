const redis = require("redis");

const redisConnect = async () => {
  const client = redis.createClient();
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect({
    url: "redis://localhost:6379",
  });
  return client;
};

const redisGetKey = async (key) => {
  client = await redisConnect();
  return await client.get(key);
};

const redisSetKey = async (key, value) => {
  client = await redisConnect();
  return await client.set(key, value);
};

const redisSetKeyWithExpire = async (key, value, expireDuration) => {
  try {
    const client = await redisConnect();
    return await client.set(key, value, { EX: expireDuration });
  } catch (e) {
    console.log(e);
  }
};

const redisDeleteKey = async (key) => {
  client = await redisConnect();
  return await client.del(key);
};

module.exports = {
  redisGetKey,
  redisSetKey,
  redisSetKeyWithExpire,
  redisDeleteKey,
};
