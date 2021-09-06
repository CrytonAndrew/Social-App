import express from "express"
const router = express.Router()

import {
    getPosts,
    getPost,
    createPost,
    deletePost,
    likePost,
    getTimeLinePosts
} from "../controller/postController.js"

import {protect} from "../middleware/authMiddleware.js"

router.route("/").get(getPosts).post(protect, createPost)
router.route("/timeline/all").get(getTimeLinePosts)
router.route("/:id").get(getPost)
router.route("/:id/delete").delete(protect, deletePost)
router.route("/:id/like").put(protect, likePost)

export default router