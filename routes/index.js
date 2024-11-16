const routes = require("express").Router();
routes.get("/", (req, res) => {
  res.send("Hello World");
});

routes.use("/api-doc", require("./swagger"));

routes.use("/users", require("./users"));

module.exports = routes;
