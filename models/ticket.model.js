const sequelize = require("../database/db.config");
const { DataTypes } = require("sequelize");

const User = require("./user.model");

const Ticket = sequelize.define("ticket", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  product: {
    type: DataTypes.ENUM("iPhone", "iPad", "iPod", "Macbook"),
    allowNull: false,
    validate: {
      notNull: { msg: "Por favor, selecione um produto!" },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Por favor, insira uma descrição do problema." },
    },
  },
  status: {
    type: DataTypes.ENUM("new", "open", "closed"),
    defaultValue: "new",
    allowNull: false,
    validate: {
      notNull: { msg: "Por favor, selecione um produto!" },
    },
  },
});

User.hasMany(Ticket);
Ticket.belongsTo(User);

module.exports = Ticket;
