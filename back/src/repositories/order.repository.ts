import OrderProductModel from '../database/models/orderProduct.model';
import ProviderModel from '../database/models/provider.model';
import { FindOptions, Transaction } from 'sequelize';
import Order from '../types/order.type';
import OrderModel from '../database/models/order.model';
import AddressModel from '../database/models/address.model';

export default class OrderRepository {
  private defaultFindOptions: FindOptions = {
    include: [
      {
        model: OrderProductModel,
        as: 'products',
        attributes: [['product_id', 'id'], 'quantity'],
        include: [
          {
            model: ProviderModel,
            as: 'provider',
          },
        ],
      },
      {
        model: AddressModel,
        as: 'address',
      },
    ],
    order: [['createdAt', 'desc']],
  };

  public insert(
    obj: Omit<Order, 'id' | 'products' | 'address'>,
    transaction: Transaction
  ) {
    return OrderModel.create(
      {
        userId: obj.userId,
        addressId: obj.addressId,
      },
      {
        transaction,
      }
    );
  }

  public findByUser(userId: number) {
    return OrderModel.findAll({
      where: {
        userId,
      },
      ...this.defaultFindOptions,
    });
  }
}
