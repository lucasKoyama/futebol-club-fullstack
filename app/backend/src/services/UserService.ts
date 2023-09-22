import * as bcrypt from 'bcryptjs';
import jwt, { Token } from '../utils/jwt';
import UserModel from '../models/UserModel';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  async login(loginData: { email: string, password: string }): Promise<ServiceResponse<Token>> {
    const user = await this.userModel.findOne(loginData.email);
    if (!user || !bcrypt.compareSync(loginData.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
    }
    const { id, role } = user;
    const token = jwt.sign({ id, role });
    return { status: 'SUCCESSFUL', data: token };
  }
}
