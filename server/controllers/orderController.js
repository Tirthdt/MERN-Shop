import expressAsyncHandler from "express-async-handler";
import Order from "../models/Order.js";

export const addOrderItems = expressAsyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
  } = req.body;
  if (orderItems && orderItems.length == 0) {
    res.status(400);
    throw new Error("No items in the order");
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
  });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

export const getOrderById = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

export const updateOrderPaid = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.body._id);

  if (order) {
    order.isPaid = true;
    order.payedAt = Date.now();
    order.paymentResult = {
      id: req.body.paymentId,
      status: "Success",
      updateTime: new Date(),
      emailAddress: req.body.email,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("No Order Found");
  }
});

export const updateOrderDelivered = expressAsyncHandler(
  async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("No Order Found");
    }
  }
);

export const getMyOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export const getOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "id name email");
  res.json(orders);
});
