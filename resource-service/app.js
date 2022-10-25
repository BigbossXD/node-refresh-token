const express = require("express");
const app = express();
const config = require("./src/configs/service/service.config");
const serviceAuthen = require("./src/middleware/service.resource.middleware");
const accessTokenVerify = require("./src/middleware/accessToken.middleware");

port = config.PORT;
const cors = require("cors");

app.use(cors());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(serviceAuthen);
app.use(accessTokenVerify);

const dataSourceRoute = require("./src/routes/dataSource.route");
app.use("/data-source", dataSourceRoute);

app.listen(port, () => {
  console.log("server listen on port", port);
});
