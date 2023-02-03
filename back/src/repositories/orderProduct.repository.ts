import Product from '../types/product.type';
import OrderProduct from '../database/models/orderProduct.model';

export default class OrderProductRepository {
  public insert(orderId: number, product: Product) {
    console.log({
      orderId,
      poductId: product.id,
      providerId: product.provider.id,
      quantity: product.quantity,
    });

    return OrderProduct.create({
      orderId,
      productId: product.id,
      providerId: product.provider.id,
      quantity: product.quantity,
    });
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
