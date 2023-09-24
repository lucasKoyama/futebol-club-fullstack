import { QueryTypes } from 'sequelize';
import SequelizeLeaderBoard from '../database/models/SequelizeLeaderBoard';
import { ILeader } from '../Interfaces/leaderBoard/ILeader';
import { ILeaderModel } from '../Interfaces/leaderBoard/ILeaderModel';

export default class LeaderBoardModel implements ILeaderModel {
  private model = SequelizeLeaderBoard;
  private p = 'totalVictories * 3 + totalDraws';
  private j = 'totalVictories + totalDraws + totalLosses';

  async findAll(): Promise<ILeader[]> {
    const result = await this.model.sequelize?.query(`
      SELECT *, ${this.p} AS 'totalPoints', ${this.j} AS 'totalGames',
        goalsFavor - goalsOwn AS 'goalsBalance',
        FORMAT((((${this.p}) / ((${this.j}) * 3)) * 100), 2) AS 'efficiency'
      FROM (
        SELECT
          team_name AS 'name',
          SUM(home_team_goals > away_team_goals) AS 'totalVictories',
          SUM(home_team_goals = away_team_goals) AS 'totalDraws',
          SUM(home_team_goals < away_team_goals) AS 'totalLosses',
          SUM(home_team_goals) AS 'goalsFavor', SUM(away_team_goals) AS 'goalsOwn'
        FROM matches AS m INNER JOIN teams AS t ON m.home_team_id = t.id WHERE in_progress = 0
          GROUP BY t.team_name)
      AS result ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
    `, { type: QueryTypes.SELECT });
    return result as ILeader[];
  }
}
