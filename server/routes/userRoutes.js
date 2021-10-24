import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  authUser,
  getProfile,
  registerUser,
  updateProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/").get(protect, admin, getUsers);
router.route("/:id").get(protect, admin, getUserById);
router.route("/:id").put(protect, admin, updateUser);
router.route("/profile").get(protect, getProfile);
router.route("/profile").put(protect, updateProfile);
router.route("/").post(registerUser);
router.route("/:id").delete(protect, admin, deleteUser);

export default router;
