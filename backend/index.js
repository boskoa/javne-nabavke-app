require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')
const express = require('express')
const { connectToDatabase } = require('./utils/db')

const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL)

const start = async () => {
  await connectToDatabase()
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
}

start()