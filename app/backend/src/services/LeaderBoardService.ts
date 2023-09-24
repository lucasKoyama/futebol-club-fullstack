import { ILeaderModel } from '../Interfaces/leaderBoard/ILeaderModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeader } from '../Interfaces/leaderBoard/ILeader';
import LeaderBoardModel from '../models/LeaderBoardModel';

export default class LeaderBoardService {
  constructor(
    private leaderBoardModel: ILeaderModel = new LeaderBoardModel(),
  ) { }

  joinLeaders(lhome: ILeader, laway: ILeader[], index: number) {
    this.joinLeaders = this.joinLeaders.bind(this);
    const data = {
      name: lhome.name,
      totalPoints: Number(lhome.totalPoints) + Number(laway[index].totalPoints),
      totalGames: Number(lhome.totalGames) + Number(laway[index].totalGames),
      totalVictories: Number(lhome.totalVictories) + Number(laway[index].totalVictories),
      totalDraws: Number(lhome.totalDraws) + Number(laway[index].totalDraws),
      totalLosses: Number(lhome.totalLosses) + Number(laway[index].totalLosses),
      goalsFavor: Number(lhome.goalsFavor) + Number(laway[index].goalsFavor),
      goalsOwn: Number(lhome.goalsOwn) + Number(laway[index].goalsOwn),
      goalsBalance: Number(lhome.goalsBalance) + Number(laway[index].goalsBalance),
    };
    const efficiency = +((((data.totalPoints) / (data.totalGames * 3)) * 100).toFixed(2));
    return { ...data, efficiency };
  }

  rankLeaders(l1: ILeader, l2: ILeader): number {
    this.rankLeaders = this.rankLeaders.bind(this);
    return l2.totalPoints - l1.totalPoints
      || l2.totalVictories - l1.totalVictories
      || l2.goalsBalance - l1.goalsBalance
      || l2.goalsFavor - l1.goalsFavor;
  }

  async findAll(filter: string): Promise<ServiceResponse<ILeader[]>> {
    let leaders;
    if (filter === '') {
      const sortNames = (l1: ILeader, l2: ILeader) => (l1.name < l2.name ? -1 : 1); // wont't have equal names here
      const homeLeaders = (await this.leaderBoardModel.findAll('home')).sort(sortNames);
      const awayLeaders = (await this.leaderBoardModel.findAll('away')).sort(sortNames);
      leaders = homeLeaders
        .map((homeLeader, i) => this.joinLeaders(homeLeader, awayLeaders, i))
        .sort((leader1, leader2) => this.rankLeaders(leader1, leader2));
    } else {
      leaders = await this.leaderBoardModel.findAll(filter);
    }
    return { status: 'SUCCESSFUL', data: leaders };
  }
}
