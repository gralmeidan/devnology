import Address from './address.type';
import Product, { ProductInput } from './product.type';

type Order<T extends Product | ProductInput | never = never> = {
  id: number;
  userId: number;
  addressId: number;
  products?: T[];
  address?: Address;
};

export type OrderInput = Required<Omit<Order<ProductInput>, 'address' | 'id'>>;

export default Order;
