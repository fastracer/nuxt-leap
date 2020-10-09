import mongoose from 'mongoose'

import User from './user'
import UserLimit from './user_limit'

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useFindAndModify: false })
}

const models = { User, UserLimit }

export { connectDb }

export default models
