import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getAllProducts, getProductById } from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", expressAsyncHandler(getAllProducts));

router.get("/:id", expressAsyncHandler(getProductById));


export default router