module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define("order", {
    status: {
      type: Sequelize.INTEGER,
    },
    product_id: {
      type: Sequelize.INTEGER,
      references: sequelize.product,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: sequelize.users,
    },
  });

  Model.statusEnum = [
    { val: 1, name: "В корзине" },
    { val: 2, name: "Оплачен" },
    { val: 3, name: "Доставлен" },
  ];

  return Model;
};
