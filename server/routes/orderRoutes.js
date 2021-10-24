import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderPaid,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/myOrders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderPaid);

export default router;
