import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: String,
  image: String,
  price: Number,
  size: String,
  quantity: {
    min: 1,
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    items: {
      required: true,
      type: [orderItemSchema],
    },
    shippingAddress: {
      city: { type: String, required: true },
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    paystackReference: {
      type: String,
      sparse: true,
      unique: true,
    },
  },
  { timestamps: true },
);

orderSchema.index({ 'customer.email': 1, createdAt: -1 });
orderSchema.index({ 'customer.userId': 1, createdAt: -1 });

export const orderModel = mongoose.model('Order', orderSchema);
