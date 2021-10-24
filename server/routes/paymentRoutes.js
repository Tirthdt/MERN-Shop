import express from "express";
import {
  initiatePayment,
  verifyPayment,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, initiatePayment);
router.route("/validate").post(protect, verifyPayment);

export default router;
