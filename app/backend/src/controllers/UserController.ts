import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class TeamController {
  constructor(
    private userService = new UserService(),
  ) { }

  async login(req: Request, res: Response) {
    const { status, data } = await this.userService.login(req.body);
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
    res.status(200).json(data);
  }
}
