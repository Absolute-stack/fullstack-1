import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    sizes: [{ type: String }],
    images: [{ type: String }],
    stock: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

productSchema.index({ isActive: 1 });
productSchema.index({ price: 1, category: 1 });
productSchema.index({ name: 'text', description: 'text' });
export const productModel = mongoose.model('Product', productSchema);
