import User from '../types/user.type';
import UserModel from '../database/models/user.model';

export default class UserRepository {
  public insert(obj: Omit<User, 'id'>) {
    return UserModel.create({
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      password: obj.password,
    });
  }

  public findByEmail(email: string) {
    return UserModel.findOne({
      where: {
        email,
      },
    });
  }

  public findById(id: number) {
    return UserModel.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
  }
}
