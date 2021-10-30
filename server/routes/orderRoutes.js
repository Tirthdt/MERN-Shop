import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderPaid,
  getOrders,
  updateOrderDelivered,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/").get(protect, admin, getOrders);
router.route("/myOrders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/delivered").put(protect, admin, updateOrderDelivered);
router.route("/:id/pay").put(protect, updateOrderPaid);

export default router;
