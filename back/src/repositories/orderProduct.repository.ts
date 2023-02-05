import Product from '../types/product.type';
import OrderProductModel from '../database/models/orderProduct.model';
import { Transaction } from 'sequelize';

export default class OrderProductRepository {
  public insert(orderId: number, product: Product, transaction: Transaction) {
    return OrderProductModel.create(
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
    return OrderProductModel.findOne({
      where: {
        orderId,
        productId,
        providerId,
      },
    });
  }
}
