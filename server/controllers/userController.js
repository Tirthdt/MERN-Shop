import User from "../models/User.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

export const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const isPasswordMatched = await user.matchPasswords(password);
    if (isPasswordMatched) {
      return res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Password");
    }
  }
  res.status(404);
  throw new Error("User Not found");
});

export const getProfile = expressAsyncHandler(async (req, res, next) => {
  try {
    const user = req.user;
    if (user) {
      return res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      return res.status(401).send({ message: "Not a valid user" });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

export const updateProfile = expressAsyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.email = req.body.email || user.email;
      user.name = req.body.name || user.name;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      return res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      return res.status(401).send({ message: "Not a valid user" });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (!userExists) {
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } else {
    res.status(400);
    throw new Error("User Already Exists");
  }
});

export const getUsers = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

export const getUserById = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const updateUser = expressAsyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.email = req.body.email || user.email;
      user.name = req.body.name || user.name;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      return res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      return res.status(401).send({ message: "Not a valid user" });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

export const deleteUser = expressAsyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (user) {
    await user.remove();
    res.json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
