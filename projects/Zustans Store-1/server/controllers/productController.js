import { Product } from '../models/productModel.js';

export async function getProducts(req, res) {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      limit = 6,
      cursor,
    } = req.query;

    const filters = {};

    const limitNum = Math.min(Number(limit), 50);

    if (category) {
      filters.category = category;
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }
    if (search) {
      filters.name = { $regex: search, $options: 'i' };
    }

    if (cursor) filters._id = { $lt: cursor };

    const products = await Product.find(filters)
      .sort({ createdAt: -1 })
      .limit(limitNum + 1)
      .lean();

    const hasNextPage = products.length > limitNum;

    if (hasNextPage) products.pop();

    const nextCursor = hasNextPage ? products[products.length - 1]._id : null;

    return res.json({
      products,
      hasNextPage,
      nextCursor,
    });
  } catch (err) {
    console.error(err);
  }
  return res.json({
    success: false,
    message: 'Internal Server Error',
  });
}

export async function getProductFilters(req, res) {
  try {
    const [categories, priceRange] = await Promise.all([
      Product.distinct('category'),
      Product.aggregate([
        {
          $group: {
            _id: null,
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
          },
        },
      ]),
    ]);

    return res.json({
      categories,
      minPrice: priceRange?.[0].minPrice ?? 0,
      maxPrice: priceRange?.[0].maxPrice ?? 0,
    });
  } catch (error) {
    console.error(error);
    return res.send(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}
