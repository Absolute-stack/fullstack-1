import { orderModel as Order } from '../models/orderModel.js';
import { productModel as Product } from '../models/productModel.js';

export async function createOrder(req, res) {
  try {
    const { items, shippingAddress, guestName, guestEmail } = req.body;

    const isGuest = !req.user;
    if (isGuest && (!guestName || !guestEmail))
      return res.status(400).json({
        success: false,
        message: 'Email and name required',
      });

    const productIds = items.map((item) => item.productId);
    const products = await Product.find({
      $in: { productIds },
      isActive: true,
    });

    if (products.length < items.length)
      return res.status(400).json({
        success: false,
        message: 'One or more products are unavailable',
      });

    for (const item of items) {
      const product = products.find((p) => p._id === item.productId);
      if (product.stock < item.quantity)
        return res.status(400).json({
          success: false,
          message: 'Stock of ${product.name} is not enough',
        });
    }

    const orderItems = items.map((item) => {
      const product = products.find((p) => p._id === item.productId);
      return {
        product: product._id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        size: item.size,
        quantity: item.quantity,
      };
    });

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const customer = {
      userId: isGuest ? null : req.user.id,
      name: isGuest ? guestName : req.user.name,
      email: isGuest ? guestEmail : req.user.email,
    };

    const order = await Order.create({
      customer,
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentStatus: 'pending',
      deliveryStatus: 'pending',
    });

    return res.status(201).json({ order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: 'false',
      message: 'Internal Server Error',
    });
  }
}

export async function getMyOrders(req, res) {
  try {
    const { limit = 5, cursor } = req.query;
    const filters = { 'customer.userId': req.user.id };
    const limitNum = Math.min(Number(limit), 50);
    if (cursor) filters._id = { $lt: cursor };

    const orders = await Order.find(filters)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limitNum + 1)
      .lean();

    const hasNextPage = orders.length > limitNum;
    if (hasNextPage) orders.pop();
    const nextCursor = hasNextPage ? orders[orders.length - 1]._id : null;
    return res.status(200).json({
      success: true,
      orders,
      hasNextPage,
      nextCursor,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function guestOrderLookUp(req, res) {
  try {
    const { email, reference } = req.query;
    if (!email || !reference)
      return res.status(400).json({
        success: false,
        message: 'Both an email and a reference is required',
      });
    const order = await Order.findOne({
      'customer.email': email,
      'customer.userId': null,
      paystackReference: reference,
    }).populate('items.product', 'name images');

    return res.status(200).json({
      order,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer.userId', 'name email')
      .populate('items.product', 'name images');

    if (!order)
      return res.status(400).json({
        success: false,
        message: 'Order not found',
      });

    if (req.user && req.user.role !== 'admin') {
      const belongToUser = order?.customer?.userId?._id == req.user.id;
      if (!belongToUser)
        return res.status(400).json({
          message: 'Not autorized',
        });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error(error);
  }
}

export async function getAdminOrders(req, res) {
  try {
    const { limit = 10, cursor, deliveryStatus, paymentStatus } = req.query;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}
