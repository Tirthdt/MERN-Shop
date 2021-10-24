import expressAsyncHandler from "express-async-handler";
import razorPay from "razorpay";
import crypto from "crypto";

export const initiatePayment = expressAsyncHandler(async (req, res, next) => {
  try {
    const instance = new razorPay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: Math.round(req.body.amount) * 100,
      currency: "INR",
      receipt: `Order Receipt ${req.body.orderId}`,
    };

    const order = await instance.orders.create(options);
    if (!order) {
      res.status(500);
      throw new Error("Some Error occured");
    }

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export const verifyPayment = expressAsyncHandler(async (req, res, next) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;
    const shaVal = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

    shaVal.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shaVal.digest("hex");

    if (digest !== razorpaySignature) {
      res.status(404);
      throw new Error("Payment not successful");
    }

    res.json({
      message: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
