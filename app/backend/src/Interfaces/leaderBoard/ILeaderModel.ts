import { ILeader } from './ILeader';

export interface ILeaderModel {
  findAll(filter: string): Promise<ILeader[]>
}
