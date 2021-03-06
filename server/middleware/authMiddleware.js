import jwt from "jsonwebtoken";
import colors from "colors";
import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.JWT_SECRET
      );
      const { id } = token;
      req.user = await User.findById(id).select("-password");

      return next();
    } catch (err) {
      console.log(`Token validation failed`.red.inverse);
      res.status(401);
      throw new Error("Token validation failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(404);
    throw new Error("Not Authorized as an admin");
  }
};
