import { ILeader } from './ILeader';

export interface ILeaderModel {
  findAll(): Promise<ILeader[]>
}
