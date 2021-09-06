import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    profilePicture: {
      type: String,
      default: "/images/profile.jpeg"
    },
    coverPicture: {
        type: String,
        default: "/images/profile.jpeg"
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    desc: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    from: {
      type: String,
      default: ""
    },
    relationship: {
      type: String,
      default: ""
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
