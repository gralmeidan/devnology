import Product from '../types/product.type';
import OrderProduct from '../database/models/orderProduct.model';
import { Transaction } from 'sequelize';

export default class OrderProductRepository {
  public insert(orderId: number, product: Product, transaction: Transaction) {
    return OrderProduct.create(
      {
        orderId,
        productId: product.id,
        providerId: product.provider.id,
        quantity: product.quantity,
      },
      {
        transaction,
      }
    );
  }

  public findByIds(orderId: number, productId: number, providerId: number) {
    return OrderProduct.findOne({
      where: {
        orderId,
        productId,
        providerId,
      },
    });
  }
}
