module.exports = (app) => {
  const controller = require("../controllers/order.controller.js");
  const authJwt = require("../middleware/authJwt");

  const router = require("express").Router();

  // Create a new Order
  router.post("/", [authJwt.verifyToken], controller.create);

  // Retrieve all Orders
  router.get("/", [authJwt.verifyToken], controller.findAll);

  // Retrieve a single Order with id
  router.get("/:id", [authJwt.verifyToken], controller.findOne);

  // Update a Order with id
  router.put("/:id", [authJwt.verifyToken], controller.update);

  // Delete a Order with id
  router.delete(
    "/:id",
    [authJwt.verifyToken],
    controller.delete
  );

  // Delete all Orders
  router.delete(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteAll
  );

  // Get possible statuses
  router.get("/info/statuses", controller.getStatuses);

  app.use("/api/orders", router);
};
