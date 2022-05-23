const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Procedure extends Model {}
Procedure.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  number: {
    type: DataTypes.STRING,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  frameworkAgreement: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  criterion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  auction: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  submissionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  budget: {
    type: DataTypes.FLOAT
  },
  deliveryLocation: {
    type: DataTypes.STRING
  },
  deliveryDate: {
    type: DataTypes.INTEGER
  },
  payment: {
    type: DataTypes.INTEGER
  },
  offerValidity: {
    type: DataTypes.INTEGER
  },
  filledDraft: {
    type: DataTypes.BOOLEAN
  },
  copy: {
    type: DataTypes.INTEGER
  },
  amount: {
    type: DataTypes.FLOAT
  },
  phase: {
    type: DataTypes.STRING
  },
  comment: {
    type: DataTypes.TEXT
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  contractingAuthorityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'contractingAuthorities',
      key: 'id'
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  modelName: 'procedure'
})

module.exports = Procedure