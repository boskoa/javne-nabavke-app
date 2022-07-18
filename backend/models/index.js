const User = require('./user')
const Procedure = require('./procedure')
const Requirement = require('./requirement')
const ContractingAuthority = require('./contractingAuthority')
const Notification = require('./notification')

User.hasMany(Procedure)
Procedure.belongsTo(User)
Procedure.hasMany(Requirement, {
  onDelete: 'CASCADE',
  hooks: true
})
Requirement.belongsTo(Procedure)
ContractingAuthority.hasMany(Procedure)
Procedure.belongsTo(ContractingAuthority)
User.hasMany(Notification)
Notification.belongsTo(User)
Notification.belongsTo(Procedure)
Procedure.hasMany(Notification, {
  onDelete: 'CASCADE',
  hooks: true
})

module.exports = { User, Procedure, ContractingAuthority, Requirement, Notification }