import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            profilePicture: user.profilePicture,
            coverPicture: user.coverPicture,
            followers: user.followers,
            following: user.following,
            desc: user.desc,
            city: user.city,
            from: user.from,
            relationship: user.relationship,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(401)
        throw new Error("User already exists with the email")
    }

    const newUser = await User.create({
        username, 
        email, 
        password
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            profilePicture: newUser.profilePicture,
            coverPicture: newUser.coverPicture,
            followers: newUser.followers,
            following: newUser.following,
            desc: newUser.desc,
            city: newUser.city,
            from: newUser.from,
            relationship: newUser.relationship,
            token: generateToken(newUser._id),
        })
    } else {
        res.status(400)
        throw new Error("New user not created")
    }
})

const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            profilePicture: user.profilePicture,
            coverPicture: user.coverPicture,
            followers: user.followers,
            following: user.following,
            desc: user.desc,
            city: user.city,
            from: user.from,
            relationship: user.relationship,
        })
    }
})

const updateProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.desc = req.body.desc || user.desc
        user.city = req.body.city || user.city
        user.from = req.body.from || user.from

        if (req.body.password) {
        user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        profilePicture: updatedUser.profilePicture,
        coverPicture: updatedUser.coverPicture,
        followers: updatedUser.followers,
        following: updatedUser.following,
        desc: updatedUser.desc,
        city: updatedUser.city,
        from: updatedUser.from,
        relationship: updatedUser.relationship,
        token: generateToken(updatedUser._id),
        })
    }
    else {
        res.status(401)
        throw new Error("user does not exist")
    }
})

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

const deleteUser = asyncHandler(async(req, res) => {
    const userId = req.params.id

    const user = await User.findById(userId)

    if (user) {
        await user.remove()
        res.json({message: "User deleted"})
    }
    else {
        res.status(401)
        throw new Error("Error occured while trying to delete user")
    }
})

const followUser = asyncHandler(async (req, res) => {
    const userToFollow = await User.findById(req.params.id)
    const currentUser = await User.findById(req.user._id)

    if (userToFollow) {
        const alreadyFollowed = userToFollow.followers.find(
            (f) => f.toString() === currentUser._id.toString()
        )
        
        if (alreadyFollowed) {
            res.status(400)
            throw new Error("Already following user")
        }

        userToFollow.followers.push(req.user._id)
        currentUser.following.push(userToFollow._id)

        await userToFollow.save()
        await currentUser.save()
        res.status(201).json('Successfully followed')
    }
    else {
        res.status(404)
        throw new Error("User to follow does not exist")
    }
})

const unfollowUser = asyncHandler(async (req, res) => {
    const userToUnfollow = await User.findById(req.params.id)
    const currentUser = await User.findById(req.user._id)

    if (userToUnfollow) {
        const alreadyFollowed = userToUnfollow.followers.find(
            (f) => f.toString() === currentUser._id.toString()
        )
        
        if (alreadyFollowed) {
            for ( var i = 0; i < userToUnfollow.followers.length; i++) {
                if (userToUnfollow.followers[i].toString() === currentUser._id.toString()) {
                    userToUnfollow.followers.splice(i, 2)
                }
            }

            for ( var i = 0; i < currentUser.following.length; i++) {
                if (currentUser.following[i].toString() === userToUnfollow._id.toString()) {
                    currentUser.following.splice(i, 2)
                }
            }
    
            await userToUnfollow.save()
            await currentUser.save()
            res.status(201).json('Successfully unfollowed')
        }
    }
    else {
        res.status(404)
        throw new Error("User to follow does not exist")
    }
})

export {
    authUser,
    getUsers,
    registerUser,
    getUserProfile,
    deleteUser,
    followUser,
    unfollowUser,
    updateProfile
}