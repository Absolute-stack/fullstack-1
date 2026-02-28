import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';

function createAccessToken(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' },
  );
}

function createRefreshToken(user) {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
}

function sendRefreshToken(res, token) {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const duplicate = await userModel.findOne({ email });
    if (duplicate)
      return res.status(404).json({
        success: false,
        message: 'This email already has an account',
      });

    const user = await userModel.create({ name, email, password });
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    user.refreshToken = refreshToken;

    await user.save();
    sendRefreshToken(res, refreshToken);

    return res.status(201).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user)
      return res.status(401).json({
        success: 'false',
        message: 'Invalid email or password',
      });

    const match = await user.comparePassword(password);
    if (!match)
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    sendRefreshToken(res, refreshToken);
    return res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: 'Logged In successfull',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

export async function refresh(req, res) {
  try {
    const token = req.cookies.refreshToken;
    if (!token)
      return res.status(401).json({
        success: false,
        message: 'No refresh token',
      });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'invalid refresh token',
      });
    }

    const user = await userModel.findById(decoded._id).select('+refreshToken');
    if (!user || user.refreshToken !== token)
      return res.status(401).json({
        success: false,
        message: 'Refresh token reuse attempt caught',
      });

    const newAccessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    sendRefreshToken(res, newRefreshToken);
    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      message: 'Refresh Token sent successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

export async function logout(req, res) {
  try {
    const token = req.cookies.refreshToken;
    if (token)
      await userModel.findOneAndUpdate(
        { refreshToken: token },
        { refreshToken: null },
      );
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
}

export async function getMe(req, res) {
  try {
    const user = await userModel.findById(req.user._id).lean();
    if (!user)
      return res.status(400).json({
        success: false,
        message: 'No user found',
      });
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}
