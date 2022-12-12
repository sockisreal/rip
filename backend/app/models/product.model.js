module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("product", {
        name: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        image: {
            type: Sequelize.STRING,
        },
        category_id: {
            type: Sequelize.INTEGER,
            references: sequelize.category,
        },
    });

    return Model;
};
