import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import routes from './routes'
import { connectDb } from './models'

require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { secure: false },
    resave: true,
    saveUninitialized: true,
  })
)

connectDb()
  .then(() => {
    console.log('MongoDb Connected Successfully')
  })
  .catch((err) => {
    console.error(err)
  })

app.use(routes)

export default {
  path: '/api',
  handler: app,
}
