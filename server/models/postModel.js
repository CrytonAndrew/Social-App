import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    desc:  {
        type: String,
        max: 500,
    },
    img: {
        type: String
    },
    likes: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true
})

const User = mongoose.model('Post', postSchema)

export default User