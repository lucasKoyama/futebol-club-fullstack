import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
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

  async updateMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const progressOrScore = req.url.includes('finish')
      ? { inProgress: false } : { homeTeamGoals, awayTeamGoals };
    const { status, data } = await this.matchService.updateMatch(id, progressOrScore);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    const { status, data } = await this.matchService.createMatch({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true,
    });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
