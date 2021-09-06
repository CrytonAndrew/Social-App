import asyncHandler from "express-async-handler"
import Post from "../models/postModel.js"
import User from "../models/userModel.js"

const getPosts = asyncHandler(async (req,res) => {
    const posts = await Post.find({})
    res.json(posts)
})

const createPost = asyncHandler(async(req, res) => {
    const { desc } = req.body

    const newPost = await Post.create({
        username: req.user._id, 
        desc,
    })

    if (newPost) {
        res.status(200).json(newPost)
    }
    else {
        res.json(401)
        throw new Error("Error occured while creating new post")
    }
})

const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post && post.userId === req.user._id) {
        await post.deleteOne()
        res.status(200)
        res.json({message: "Successfully delete post"})
    }
    else {
        res.status(404)
        throw new Error("Post does not exist or you dont have permission")
    }
})

const likePost = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id)

    if (post) {
        //Check if he already liked
        const alreadyLiked = posts.likes.find((p) => p.toString() === req.user._id.toString())
        if (alreadyLiked) {
            res.status(401)
            throw new Error("You already liked the post")
        }

        post.likes.push(req.user._id);

        await post.save()
        res.status(200)
        res.json({message: "Successfully liked post"})
    }
})

const getPost = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id)
    res.json(post)
})

const getTimeLinePosts = asyncHandler(async (req, res) => {
    const currentUser = await User.findById(req.body.userId);
    if (currentUser) {
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
        currentUser.following.map((friendId) => {
            return Post.find({ userId: friendId });
        })
        );
        res.json(userPosts.concat(...friendPosts))
    }
    else {
        res.status(401)
        throw new Error("User does not exist")
    }
})

export {
    getPosts,
    getPost,
    createPost,
    deletePost,
    likePost,
    getTimeLinePosts
}