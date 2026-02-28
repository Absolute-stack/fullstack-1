import multer from 'multer';
import cloudinary from '../config/connectCloud.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'zustand/productimages',
  allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
  transformations: [
    { quality: 'auto' },
    { fetch_format: 'auto' },
    { width: 800, height: 800, crop: 'limit' },
  ],
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, //5MB
});
