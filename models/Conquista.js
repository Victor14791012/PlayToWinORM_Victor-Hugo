const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const Jogo = require('./Jogo');

const Conquista = db.define('Conquista', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Jogo.hasMany(Conquista, { foreignKey: 'jogo_id' });
Conquista.belongsTo(Jogo, { foreignKey: 'jogo_id' });

module.exports = Conquista;
