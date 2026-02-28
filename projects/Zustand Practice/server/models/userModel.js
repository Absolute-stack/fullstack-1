import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      trim: true,
      type: String,
      required: true,
    },
    email: {
      trim: true,
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
      select: false,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one special character.',
      ],
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidate) {
  return await bcrypt.compare(candidate, this.password);
};

userSchema.index({ name: 1, email: 1, role: 1, createdAt: -1 });

export const userModel = mongoose.model('User', userSchema);
