import Address from '../types/address.type';
import HTTP_STATUS from 'http-status-codes';
import RestError from '../errors/rest.error';
import validateSchema from './schemas/utils/validateSchema';
import UserRepository from '../repositories/user.repository';
import AddressRepository from '../repositories/address.repository';
import { newAddressSchema } from './schemas/address.schema';

export default class AddressService {
  constructor(
    protected addressRepository = new AddressRepository(),
    protected userRepository = new UserRepository()
  ) {}

  private async checkIfUserExists(id: number) {
    const resp = await this.userRepository.findById(id);

    if (!resp) {
      throw new RestError(HTTP_STATUS.NOT_FOUND, 'User not found!');
    }
  }

  public async insert(obj: Omit<Address, 'id'>) {
    const value = validateSchema<Omit<Address, 'id'>>(newAddressSchema, obj);

    await this.checkIfUserExists(value.userId);
    const resp = await this.addressRepository.insert(obj);

    return resp;
  }
}
