import { QueryTypes } from 'sequelize';
import SequelizeLeaderBoard from '../database/models/SequelizeLeaderBoard';
import { ILeader } from '../Interfaces/leaderBoard/ILeader';
import { ILeaderModel } from '../Interfaces/leaderBoard/ILeaderModel';

export default class LeaderBoardModel implements ILeaderModel {
  private model = SequelizeLeaderBoard;
  private p = 'totalVictories * 3 + totalDraws';
  private j = 'totalVictories + totalDraws + totalLosses';

  async findAll(filter: string): Promise<ILeader[]> {
    const team = filter === 'home' ? ['home_team', 'away_team'] : ['away_team', 'home_team'];
    const result = await this.model.sequelize?.query(`
      SELECT *, ${this.p} AS 'totalPoints', ${this.j} AS 'totalGames',
        goalsFavor - goalsOwn AS 'goalsBalance',
        FORMAT((((${this.p}) / ((${this.j}) * 3)) * 100), 2) AS 'efficiency'
      FROM (
        SELECT
          team_name AS 'name',
          SUM(${team[0]}_goals > ${team[1]}_goals) AS 'totalVictories',
          SUM(${team[0]}_goals = ${team[1]}_goals) AS 'totalDraws',
          SUM(${team[0]}_goals < ${team[1]}_goals) AS 'totalLosses',
          SUM(${team[0]}_goals) AS 'goalsFavor', SUM(${team[1]}_goals) AS 'goalsOwn'
        FROM matches AS m INNER JOIN teams AS t ON m.${team[0]}_id = t.id WHERE in_progress = 0
          GROUP BY t.team_name)
      AS result ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
    `, { type: QueryTypes.SELECT });
    return result as ILeader[];
  }
}
