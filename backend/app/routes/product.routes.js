module.exports = (app) => {
  const controller = require("../controllers/product.controller.js");
  const authJwt = require("../middleware/authJwt");

  const router = require("express").Router();

  // Create new Product
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all Products
  router.get("/", controller.findAll);

  // Retrieve Products by category
  router.get("/category/:category_id", controller.findAllByCategory);

  // Retrieve a single Product with id
  router.get("/:id", controller.findOne);

  // Update Product with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);

  // Delete Product with id
  router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );

  // Delete all Products
  router.delete(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteAll
  );

  app.use("/api/products", router);
};
