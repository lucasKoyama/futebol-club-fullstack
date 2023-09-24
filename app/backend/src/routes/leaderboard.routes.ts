import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get('/home', (req: Request, res: Response) => leaderBoardController.findAll(req, res));

export default router;
