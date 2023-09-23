import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import TokenAuthentication from '../middlewares/auth.middleware';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.findAllMatches(req, res));

router.patch(
  '/:id/finish',
  TokenAuthentication.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

router.patch(
  '/:id',
  TokenAuthentication.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

router.post(
  '/',
  TokenAuthentication.validateToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
