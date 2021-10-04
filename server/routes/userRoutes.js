import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  authUser,
  getProfile,
  registerUser,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(protect, getProfile);
router.route("/profile").put(protect, updateProfile);
router.route("/").post(registerUser);

export default router;
