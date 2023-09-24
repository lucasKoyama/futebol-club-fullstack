import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeLeaderBoard extends Model<InferAttributes<SequelizeLeaderBoard>,
InferCreationAttributes<SequelizeLeaderBoard>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare totalPoints: number;
  declare totalGames: number;
  declare totalVictories: number;
  declare totalDraws: number;
  declare totalLosses: number;
  declare goalsFavor: number;
  declare goalsOwn: number;
  declare goalsBalance: number;
  declare efficiency: number;
}

SequelizeLeaderBoard.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalPoints: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalGames: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVictories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalDraws: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalLosses: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  goalsFavor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  goalsOwn: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  goalsBalance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  efficiency: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'leaderboard',
  timestamps: false,
  underscored: true,
});

export default SequelizeLeaderBoard;
