import TeamModel from '../models/TeamModel';
import { NewEntity } from '../Interfaces';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) { }

  async findAllMatches(inProgress?: boolean): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  async updateMatch(id: number, data: Partial<NewEntity<IMatch>>):
  Promise<ServiceResponse<ServiceMessage>> {
    const updatedMatch = await this.matchModel.update(id, data);
    if (updatedMatch === null) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found!' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async createMatch(match: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const homeTeamExists = await this.teamModel.findById(match.homeTeamId);
    const awayTeamExists = await this.teamModel.findById(match.awayTeamId);
    if (!homeTeamExists || !awayTeamExists) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchModel.create(match);
    return { status: 'CREATED', data: newMatch };
  }
}
