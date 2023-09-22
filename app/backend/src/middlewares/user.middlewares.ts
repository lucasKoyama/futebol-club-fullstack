import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';

export default class LoginValidation {
  static validateFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const emailValidation = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailValidation.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validateToken(req: Request, res: Response): Response | void {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const token = authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token);
      return res.status(200).json({ role: decoded.role });
    } catch (e) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
