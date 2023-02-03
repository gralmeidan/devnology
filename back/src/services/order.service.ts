import { ProductInput } from '../types/product.type';
import OrderRepository from '../repositories/order.repository';
import Order from '../types/order.type';
import db from '../database/models';
import ProviderRepository from '../repositories/provider.repository';
import OrderProductRepository from '../repositories/orderProduct.repository';
import HTTP_STATUS from 'http-status-codes';
import RestError from '../errors/rest.error';
import validateSchema from './schemas/utils/validateSchema';
import { newOrderSchema } from './schemas/order.schema';
import { Transaction } from 'sequelize';

export default class OrderService {
  constructor(
    protected orderRepository = new OrderRepository(),
    protected orderProductRepository = new OrderProductRepository(),
    protected providerRepository = new ProviderRepository()
  ) {}

  private async appendProductToOrder(
    orderId: number,
    product: ProductInput,
    t: Transaction
  ) {
    const provider = await this.providerRepository.findByName(product.provider);

    if (!provider) {
      throw new RestError(HTTP_STATUS.NOT_FOUND, 'Provider not found!');
    }

    const resp = await this.orderProductRepository.findByIds(
      orderId,
      product.id,
      provider.id
    );

    if (resp) {
      throw new RestError(HTTP_STATUS.CONFLICT, 'Duplicated product in Order!');
    }

    return this.orderProductRepository.insert(
      orderId,
      {
        ...product,
        provider,
      },
      t
    );
  }

  public async placeOrder(order: Required<Omit<Order<ProductInput>, 'id'>>) {
    const value = validateSchema<Required<Omit<Order<ProductInput>, 'id'>>>(
      newOrderSchema,
      order
    );

    const result = await db.transaction(async t => {
      const resp = await this.orderRepository.insert(value, t);

      await Promise.all(
        value.products.map(p => {
          return this.appendProductToOrder(resp.id, p, t);
        })
      );

      return resp;
    });

    return result;
  }
}
