import { Stripe } from "stripe";
import { STRIPE_SECRET_KEY } from "./../config/config.js";
import Product from "../model/product.model.js";
import { io } from "../../app.js";
import Notification from "../model/notification.model.js";

const stripe = new Stripe(STRIPE_SECRET_KEY);

// CREATE a new product
export const createProduct = async (req, res, next) => {
  try {
    const { title, price, image } = req.body;

    if (!title || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({ title, price, image });
    const savedProduct = await newProduct.save();

    console.log(savedProduct)

    const notificationMessage = {
      productId: savedProduct._id,
      title: `Added new products on the store!`,
      description: `${savedProduct.title} - is added in the store`,
    };

    console.log(notificationMessage)

    const notifications = await Notification.create(notificationMessage);
    io.emit("productAddNotification", notifications);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: { savedProduct },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// GET all products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// GET single product by ID
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(400).json({ message: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// UPDATE product by ID
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({
      success: true,
      message: "Product updated",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// DELETE product by ID
export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.productId
    );
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// PRODUCTS PAYMENT
export const payment = async (req, res, next) => {
  try {
    const { amount, productName } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: productName },
            unit_amount: amount, // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://stripe-client-kappa.vercel.app/payment_success",
      cancel_url: "https://stripe-client-kappa.vercel.app/payment_cancel",
    });

    res.status(202).json(session.url);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
