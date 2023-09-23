import { NewEntity } from '..';
import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(inProgress: boolean): Promise<IMatch[]>
  update(id: IMatch['id'], data: Partial<NewEntity<IMatch>>): Promise<IMatch | null>
  create(match: NewEntity<IMatch>): Promise<IMatch>
}
