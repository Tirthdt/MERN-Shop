import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.route("/top").get(getTopRatedProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, updateProduct);
router.post("/:id/reviews", protect, createProductReview);
router.route("/delete/:id").delete(protect, admin, deleteProductById);
router.route("/create").post(protect, admin, createProduct);

export default router;
