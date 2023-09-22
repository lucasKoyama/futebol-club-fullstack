import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeMatches from './SequelizeMatches';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeam.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'team',
  timestamps: false,
  underscored: true,
});

SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'id', as: 'homeTeamId' });
SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'id', as: 'awayTeamId' });

SequelizeMatches.belongsTo(SequelizeTeam, { foreignKey: 'id' });
SequelizeMatches.belongsTo(SequelizeTeam, { foreignKey: 'id' });

export default SequelizeTeam;
