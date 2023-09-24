import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeader } from '../Interfaces/leaderBoard/ILeader';
import LeaderBoardModel from '../models/LeaderBoardModel';

export default class LeaderBoardService {
  constructor(
    private leaderBoardModel: LeaderBoardModel = new LeaderBoardModel(),
  ) { }

  async findAll(filter: string): Promise<ServiceResponse<ILeader[]>> {
    const leaders = await this.leaderBoardModel.findAll(filter);
    return { status: 'SUCCESSFUL', data: leaders };
  }
}
