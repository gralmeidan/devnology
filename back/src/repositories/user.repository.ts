import User from '../types/user.type';
import UserModel from '../database/models/user.model';

export default class UserRepository {
  private defaultOptions = {
    attributes: {
      exclude: ['password'],
    },
  };

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
}
