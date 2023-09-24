import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService: LeaderBoardService = new LeaderBoardService(),
  ) { }

  async findAll(req: Request, res: Response) {
    const { data } = await this.leaderBoardService.findAll();
    res.status(200).json(data);
  }
}
