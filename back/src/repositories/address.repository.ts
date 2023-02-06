import Address from '../types/address.type';
import AddressModel from '../database/models/address.model';

export default class AddressRepository {
  public findById(id: number) {
    return AddressModel.findByPk(id);
  }

  public insert(obj: Omit<Address, 'id'>) {
    return AddressModel.create({
      userId: obj.userId,
      street: obj.street,
      number: obj.number,
      city: obj.city,
      cep: obj.cep,
      state: obj.state,
    });
  }

  public findByUser(userId: number) {
    return AddressModel.findAll({
      where: {
        userId,
      },
    });
  }
}
