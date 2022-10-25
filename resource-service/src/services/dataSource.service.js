const db = require("../configs/database/db.config");

exports.getData = async (res, username, password) => {
  const [rows] = await db.query("SELECT * FROM testdata ", []);

  return res.status(200).json({ code: "00000", data: rows });
};
