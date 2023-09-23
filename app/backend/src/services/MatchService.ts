import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) { }

  async findAllMatches(inProgress?: boolean): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
