import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  async findAllMatches(req: Request, res: Response) {
    const { inProgress: queryProgress } = req.query;
    let serviceResponse;
    if (queryProgress) {
      serviceResponse = await this.matchService
        .findAllMatches(queryProgress === 'true');
    } else {
      serviceResponse = await this.matchService.findAllMatches();
    }
    return res.status(200).json(serviceResponse.data);
  }
}
