import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import LoginValidation from '../middlewares/user.middlewares';
import TokenAuthentication from '../middlewares/auth.middleware';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  LoginValidation.validateFields,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  TokenAuthentication.validateToken,
  (req: Request, res: Response) => userController.loginRole(req, res),
);

export default router;
