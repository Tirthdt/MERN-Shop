import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authUser, getProfile, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(protect, getProfile);
router.route("/").post(registerUser);

export default router;