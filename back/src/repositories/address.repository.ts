import AddressModel from '../database/models/address.model';

export default class AddressRepository {
  public findById(id: number) {
    return AddressModel.findByPk(id);
  }
}
