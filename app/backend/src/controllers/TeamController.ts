import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  async findAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.findAllTeams();
    res.status(200).json(serviceResponse.data);
  }
}
