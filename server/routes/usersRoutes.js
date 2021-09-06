import express from "express"
const router = express.Router()
import {
    getUsers,
    authUser,
    registerUser,
    getUserProfile,
    deleteUser,
    followUser,
    unfollowUser,
    updateProfile
} from "../controller/userController.js"
import {protect} from "../middleware/authMiddleware.js"


router.route("/").post(registerUser).get(getUsers)
router.route("/login").post(authUser)
router.route("/profile").get(protect, getUserProfile).put(updateProfile)
router.route("/:id/delete").delete(deleteUser)
router.route("/:id/follow").put(protect, followUser)
router.route("/:id/unfollow").put(protect, unfollowUser)

export default router