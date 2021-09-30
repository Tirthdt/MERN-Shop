import express from "express";
import expressAsyncHandler from "express-async-handler";
import { authUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", expressAsyncHandler(authUser));

export default router;