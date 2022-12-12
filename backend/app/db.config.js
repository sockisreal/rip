module.exports = {
  HOST: "localhost",
  USER: "sonya",
  PASSWORD: "1234",
  DB: "flower",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
