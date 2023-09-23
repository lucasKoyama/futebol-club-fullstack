import { NextFunction, Request, Response } from 'express';

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
}
