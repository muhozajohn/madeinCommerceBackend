require("dotenv").config();

module.exports = {
  development: {
    url: "postgresql://postgres:0ID51OttmfLodoY34I21@containers-us-west-106.railway.app:6911/railway",
    dialect: "postgres",
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE,
    dialect: "postgres",
  },
};
