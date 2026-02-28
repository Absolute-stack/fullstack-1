import cloudinary from '../config/connectCloud.js';
import { productModel } from '../models/productModel.js';

function getPublicId(imageURL) {
  const paths = imageURL.split('/');
  const filename = paths[paths.length - 1].split('.')[0];
  return `zustand/productimages/${filename}`;
}

async function deleteCloudinaryImages(imagesURLs) {
  await Promise.all(
    imagesURLs.map((imageURL) =>
      cloudinary.uploader.destroy(getPublicId(imageURL)),
    ),
  );
}

// GET /api/products
export async function getProducts(req, res) {
  try {
    const {
      cursor,
      search,
      category,
      minPrice,
      maxPrice,
      limit = 8,
      order = 'desc',
      sortBy = 'createdAt',
    } = req.query;

    const limitNum = Math.min(Number(limit), 50);
    const sortOrder = order === 'desc' ? -1 : 1;
    const filters = {};

    if (category) filters.category = category;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }
    if (cursor) filters._id = { $lt: cursor };
    if (search) filters.$text = { $search: search };

    const products = await productModel
      .find(filters)
      .sort({ [sortBy]: sortOrder, _id: sortOrder })
      .limit(limitNum + 1)
      .lean();

    const hasNextPage = products.length > limitNum;
    if (hasNextPage) products.pop();

    const nextCursor = hasNextPage ? products[products.length - 1]._id : null;
    return res.status(200).json({
      success: true,
      products,
      nextCursor,
      hasNextPage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

// GET /api/filters

export async function productFilters(req, res) {
  try {
    const [categories, priceRange] = await Promise.all([
      productModel.distinct('category', { isActive: true }),
      productModel.aggregate(
        {
          $match: { isActive: true },
        },
        {
          $group: {
            _id: null,
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
          },
        },
      ),
    ]);

    return res.status(200).json({
      success: true,
      categories,
      minPrice: priceRange[0]?.minPrice ?? 0,
      maxPrice: priceRange[0]?.maxPrice ?? 0,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

export async function getProducttById(req, res) {
  try {
    const product = await productModel.findOne({
      _id: req.params.id,
      isActive: true,
    });
    return res.status(200).json({ product });
  } catch (error) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

export async function getAllProducts(req, res) {
  try {
    const { cursor, isActive, limit = 10 } = req.query;

    const limitNum = Math.min(Number(limit), 50);
    const filters = {};

    if (isActive !== 'undefined') filters.isActive = isActive === 'true';
    if (cursor) filters._id = { $lt: cursor };

    const products = await productModel
      .find(filters)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limitNum + 1)
      .lean();

    const hasNextPage = products.length > limitNum;
    if (hasNextPage) products.pop();

    const nextCursor = hasNextPage ? products[products.length - 1]._id : null;

    return res.status(200).json({
      success: true,
      products,
      nextCursor,
      hasNextPage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

export async function createProduct(req, res) {
  try {
    const { name, description, price, category, sizes, stock } = req.body;

    const images = req.files?.map((file) => file.path);

    const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;

    const product = await productModel.create({
      name,
      description,
      price: Number(price),
      category,
      sizes: parsedSizes,
      images,
      stock: Number(stock),
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await productModel.findOneAndUpdate({
      new: true,
      isActive: false,
      _id: req.params.id,
    });

    if (!product)
      res.status(400).json({
        success: false,
        message: '',
      });
    return res.status(204).json({
      success: true,
      message: 'Product has been deleted',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}
