import User from '../types/user.type';
import UserRepository from '../repositories/user.repository';
import { newUserSchema } from './schemas/user.schema';
import validateSchema from './schemas/utils/validateSchema';
import * as bcrypt from 'bcrypt';

export default class UserService {
  constructor(protected repository = new UserRepository()) {}

  public async insert(obj: User): Promise<Omit<User, 'password'>> {
    const value = validateSchema<User>(newUserSchema, obj);
    const password = await bcrypt.hash(value.password, 10);

    const resp = await this.repository.insert({
      ...value,
      password,
    });

    return {
      id: resp.id,
      firstName: resp.firstName,
      lastName: resp.lastName,
      email: resp.email,
    };
  }
}
