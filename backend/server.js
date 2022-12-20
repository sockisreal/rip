const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const db = require("./app/models");
const Role = db.role;
const User = db.user;

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });

  User.create({
    username: "admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("admin", 8),
  }).then((user) => {
    user.setRoles([2]);
  });
}

db.sequelize
  .sync({})
  .then(() => {
    console.log("Drop and re-sync db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Server is ON" });
});

// require routes
require("./app/routes/product.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,  () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("=======================");
  console.log("running at http://" + host + ":" + port);
  console.log("=======================");
});
