const { PORT } = require('./utils/config')
const express = require('express')
const { connectToDatabase } = require('./utils/db')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const proceduresRouter = require('./controllers/procedures')
const contractingAuthoritiesRouter = require('./controllers/contractingAuthorities')
const requirementsRouter = require('./controllers/requirements')
const notificationsRouter = require('./controllers/notifications')
const { errorHandler } = require('./utils/errorHandler')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/procedures', proceduresRouter)
app.use('/api/authorities', contractingAuthoritiesRouter)
app.use('/api/requirements', requirementsRouter)
app.use('/api/notifications', notificationsRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()