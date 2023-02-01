import User from '../types/user.type';
import UserRepository from '../repositories/user.repository';
import { newUserSchema } from './schemas/user.schema';
import validateSchema from './schemas/utils/validateSchema';
import * as bcrypt from 'bcrypt';
import RestError from '../errors/rest.error';
import HTTP_STATUS from 'http-status-codes';

export default class UserService {
  constructor(protected repository = new UserRepository()) {}

  private async findByEmail(email: string): Promise<User> {
    const resp = await this.repository.findByEmail(email);

    if (!resp) {
      throw new RestError(HTTP_STATUS.NOT_FOUND, 'User not found!');
    }

    return resp;
  }

  public async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<Omit<User, 'password'>> {
    const user = await this.findByEmail(email);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new RestError(HTTP_STATUS.UNAUTHORIZED, 'Invalid password!');
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  public async insert(obj: User): Promise<Omit<User, 'password'>> {
    const value = validateSchema<User>(newUserSchema, obj);
    const password = await bcrypt.hash(value.password, 10);

    const user = await this.repository.findByEmail(value.email);

    if (user) {
      throw new RestError(HTTP_STATUS.CONFLICT, 'Email already registered!');
    }

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
