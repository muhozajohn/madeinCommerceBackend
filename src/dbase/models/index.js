const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const { TEST_DB } = require("../../test/dbconfig");

const env = TEST_DB;
const config = require(`${__dirname}/../config/config`)[env];
const db = {};

let sequelize;
if (config.url) {
  try {
    sequelize = new Sequelize(config.url, { logging: false });
    sequelize.authenticate();
    console.log("DB connected.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
} else {
  try {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
    console.log("");
  } catch (error) {
    console.log(error.message);
  }
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
