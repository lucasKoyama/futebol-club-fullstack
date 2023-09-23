import { NewEntity } from '../Interfaces';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) { }

  async findAllMatches(inProgress?: boolean): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  async updateMatch(id: number, data: Partial<NewEntity<IMatch>>):
  Promise<ServiceResponse<ServiceMessage>> {
    const updatedMatch = await this.matchModel.update(id, data);
    console.log(updatedMatch);
    if (updatedMatch === null) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found!' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
