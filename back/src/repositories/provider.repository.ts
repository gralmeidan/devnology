import ProviderModel from '../database/models/provider.model';

export default class ProviderRepository {
  public findByName(name: string) {
    return ProviderModel.findOne({
      where: {
        name,
      },
    });
  }
}
