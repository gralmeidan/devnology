import { ProductInput } from '../types/product.type';
import OrderRepository from '../repositories/order.repository';
import Order from '../types/order.type';

export default class OrderService {
  constructor(protected repository = new OrderRepository()) {}

  private conflictChecks(order: Required<Order<ProductInput>>) {
    // Checks if the provider exists
    // Checks if the user exists
    // Check if the entry doesn't already exists
    throw Error('Not Implemented');
  }

  public placeOrder(order: Required<Order<ProductInput>>) {
    // ValidateSchema
    // Conflict Checks
    // Transaction
    throw Error('Not Implemented');
  }
}
