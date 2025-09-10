import express from "express";
import {
  login,
  updateProfile,
  register,
  logout,
  getAllUsers,
  getUserById,
  addToWishlist,
  getWishlist,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("api running");
});
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
// router.route("/updateProfile").post(isAuthenticated, singleUpload, updateProfile);
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateProfile);
router.route("/logout").get(logout);
router.route("/get").get(isAuthenticated, getAllUsers);
router.route("/get/:id").get(isAuthenticated, getUserById);
router.route("/wishlist").put(isAuthenticated, addToWishlist);
router.route("/wishlist").get(isAuthenticated, getWishlist);

export default router;
