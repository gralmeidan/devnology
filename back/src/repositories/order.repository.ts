import OrderProduct from '../database/models/orderProduct.model';
import ProviderModel from '../database/models/provider.model';
import { FindOptions } from 'sequelize';
import Order from '../types/order.type';
import OrderModel from '../database/models/order.model';

export default class OrderRepository {
  private defaultFindOptions: FindOptions = {
    include: {
      model: OrderProduct,
      as: 'products',
      attributes: [['product_id', 'id'], 'quantity'],
      include: [
        {
          model: ProviderModel,
          as: 'provider',
        },
      ],
    },
  };

  public insert(obj: Omit<Order, 'id' | 'products'>) {
    return OrderModel.create({
      userId: obj.userId,
      totalPrice: obj.totalPrice,
    });
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
