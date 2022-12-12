module.exports = (app) => {
  const controller = require("../controllers/category.controller.js");
  const authJwt = require("../middleware/authJwt");

  const router = require("express").Router();

  // Create a new Category
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all Categories
  router.get("/", controller.findAll);

  // Retrieve a single Category with id
  router.get("/:id", controller.findOne);

  // Update a Category with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);

  // Delete a Category with id
  router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );

  // Delete all Categories
  router.delete(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteAll
  );

  app.use("/api/category", router);
};
