module.exports = (app) => {
  const controller = require("../controllers/user.controller.js");
  const authJwt = require("../middleware/authJwt");

  const router = require("express").Router();

  // Retrieve all Users
  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

  // Retrieve a single Order with id
  router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  app.use("/api/users", router);
};
