import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  async findAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.findAllTeams();
    res.status(200).json(serviceResponse.data);
  }

  async findTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.findTeamById(Number(id));
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
    res.status(200).json(data);
  }
}
