module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("category", {
        name: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING,
        }
    });

    return Model;
};
