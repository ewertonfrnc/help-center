const sequelize = require("../database/db.config");
const { DataTypes } = require("sequelize");

const User = require("./user.model");
const Ticket = require("./ticket.model");

const Note = sequelize.define("note", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: { msg: "Por favor, insira uma nota" },
    },
  },
  isStaff: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  staffId: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Note);
Note.belongsTo(User);

Ticket.hasMany(Note);
Note.belongsTo(Ticket);

module.exports = Note;
