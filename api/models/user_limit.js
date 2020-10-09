import mongoose from 'mongoose'

const userLimitSchema = new mongoose.Schema({
  user_uid: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
})

userLimitSchema.index({ date: 1, user_uid: 1 }, { unique: true })

const UserLimit = mongoose.model('UserLimit', userLimitSchema)

export default UserLimit
