const { Sequelize } = require("sequelize");

const devConnectionString =
  "postgres://postgres:1364@localhost:5432/support-desk";
const prodConnectionString =
  "postgresql://supportdeskdb_user:w5UpqIP3t213lGTr3LqbIzohF3oM95GK@dpg-cq8rkklds78s739515t0-a.oregon-postgres.render.com/supportdeskdb?ssl=true";

const sequelize = new Sequelize(
  process.env.NODE_ENV === "production"
    ? prodConnectionString
    : devConnectionString
);

module.exports = sequelize;
