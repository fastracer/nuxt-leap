import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  apiKey: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  expirationTime: {
    type: Number,
    required: true,
  },
})

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      unique: true,
      required: true,
    },
    displayName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    photoURL: {
      type: String,
    },
    phoneNumber: {
      type: String,
      validate: {
        validator(v) {
          return /\d{3}-\d{3}-\d{4}/.test(v)
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    token: {
      type: tokenSchema,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.path('email').validate(function (email) {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email.text) // Assuming email has a text attribute
}, 'The e-mail field cannot be empty.')

const User = mongoose.model('User', userSchema)

export default User
