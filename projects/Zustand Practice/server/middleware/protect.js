import 'dotenv/config';
import jwt from 'jsonwebtoken';

export function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({
        success: false,
        message: 'Unathorized request blocked',
      });
    const token = authHeader.split(' ')[1];
    if (!token)
      return res.status(401).json({
        success: false,
        message: 'Unathorized request blocked',
      });
    try {
      req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Invalid server error',
    });
  }
}

export function protectAdmin(req, res, next) {
  try {
    protect(req, res, () => {
      const role = req.user?.role;
      if (role !== 'admin') {
        return res.status(401).json({ message: 'Blocked unathorized access' });
      }
      next();
    });
  } catch (error) {
    console.error(error);
  }
}

export function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}
