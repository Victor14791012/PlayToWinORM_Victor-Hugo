const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const Jogo = db.define("Jogo", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precoBase: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
});

module.exports = Jogo;
