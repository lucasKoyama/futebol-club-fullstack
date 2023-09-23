import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  async findAllMatches(_req: Request, res: Response) {
    const serviceResponse = await this.matchService.findAllMatches();
    return res.status(200).json(serviceResponse.data);
  }
}
