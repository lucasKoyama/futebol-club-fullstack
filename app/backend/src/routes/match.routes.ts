import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.findAllMatches(req, res));

export default router;
