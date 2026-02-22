import express from 'express';
import {
  getProductFilters,
  getProducts,
} from '../controllers/productController.js';
export const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/filters', getProductFilters);
