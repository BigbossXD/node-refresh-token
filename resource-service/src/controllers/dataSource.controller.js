const dataSourceService = require("../services/dataSource.service");

exports.getData = async (req, res) => {
  return await dataSourceService.getData(res);
};
