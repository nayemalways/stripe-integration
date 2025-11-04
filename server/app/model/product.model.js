import mongoose from 'mongoose';
import Notification from './notification.model.js';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String, // store image URL
    required: true
  },
}, { timestamps: true });

 

const Product = mongoose.model('Product', productSchema);
export default Product;
