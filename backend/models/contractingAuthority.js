const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class ContractingAuthority extends Model {}
ContractingAuthority.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  jib: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  modelName: 'contractingAuthority'
})

module.exports = ContractingAuthority