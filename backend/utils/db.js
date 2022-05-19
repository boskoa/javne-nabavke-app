const { Sequelize, QueryTypes } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to database')
    const notes = await sequelize.query("SELECT * FROM persons", { type: QueryTypes.SELECT })
    console.log(notes)
  } catch (error) {
    console.log('Failed to connect to the database', error)
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase }