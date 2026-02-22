import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  sizes: [{ type: String, required: true }],
  stock: { type: Number, default: 0 },
  description: { type: String, required: true },
});

productSchema.index({ createdAt: -1, _id: -1 });
productSchema.index({ price: 1, category: 1 });

export const Product = mongoose.model('Product', productSchema);
