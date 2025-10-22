
// Dependencies
import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, payment, updateProduct } from "../app/controllers/product.controller.js";
 



// Create Route
const router = express.Router();

router.post('/create_product', createProduct);
router.get('/product', getProducts);
router.get('/product/:productId', getProductById);
router.patch('/product/:productId', updateProduct);
router.delete('/product/:productId', deleteProduct);
router.post('/checkout', payment);

// Finally Export
export default router;
