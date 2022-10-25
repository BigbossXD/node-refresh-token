const express = require("express");
const app = express();
const config = require("./src/configs/service/service.config");
const serviceAuthen = require("./src/middleware/service.auth.middleware");

port = config.PORT;
const cors = require("cors");

app.use(cors());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(serviceAuthen);

const authRoute = require("./src/routes/auth.route");
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log("server listen on port", port);
});
