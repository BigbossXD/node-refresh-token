const mysql = require("mysql2");
const config = require("../service/service.config");

function createPool() {
  try {
    const pool = mysql.createPool({
      host: config.DATABASE_HOST,
      user: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      database: config.DATABASE_DB,
      connectionLimit: 20,
      queueLimit: 0,
    });

    const promisePool = pool.promise();

    return promisePool;
  } catch (error) {
    console.log(`Could not connect - ${error}`);
  }
}

async function query(sql, params) {
  const pool = createPool();
  try {
    await pool.getConnection();
    const res = await pool.execute(sql, params);
    pool.end();
    return res;
  } catch (err) {
    console.log(`getConnection - ${err}`);
    await pool.end();
    process.exit(1);
  }
}

module.exports = {
  query,
};
