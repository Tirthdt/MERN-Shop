import expressAsyncHandler from "express-async-handler";
import Product from "../models/Product.js";

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  const pageSize = 10;
  const pageNumber = Number(req.query.pageNumber) || 1;

  const query =
    JSON.stringify(req.query.keyword) === JSON.stringify("undefined");

  const keyword = !query
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1));

  res
    .status(200)
    .json({ products, pageNumber, pages: Math.ceil(count / pageSize) });
});

export const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const createProduct = expressAsyncHandler(async (req, res, next) => {
  const product = new Product({
    name: "Sample Product",
    price: 0,
    description: "Sample Description",
    category: "Sample category",
    brand: "Sample Brand",
    user: req.user._id,
    countInStock: 0,
    numReviews: 0,
    image: "/images/sample.jpg",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

export const updateProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.numReviews = req.body.numReviews || product.numReviews;
    product.image = req.body.image || product.image;
    const updatedProduct = await product.save();
    return res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const createProductReview = expressAsyncHandler(
  async (req, res, next) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alradayReviewed = product.reviews.some((review) => {
        return review.user.toString() === req.user._id.toString();
      });
      if (alradayReviewed) {
        res.status(400).json({
          message: "You have already reviewed this product",
        });
        return;
      }
      const review = {
        name: req.user.name,
        rating,
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, curr) => {
          return acc + curr.rating;
        }, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review created successfully" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }
);

export const deleteProductById = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export const getTopRatedProducts = expressAsyncHandler(
  async (req, res, next) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    res.json(products);
  }
);
