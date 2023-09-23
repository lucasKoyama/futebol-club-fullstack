import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';

export default class TokenAuthentication {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const token = authorization.split(' ')[1];
    try {
      const user = jwt.verify(token);
      req.body = { ...req.body, user };
      next();
    } catch (e) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
