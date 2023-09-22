import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import LoginValidation from '../middlewares/user.middlewares';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  LoginValidation.validateFields,
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
