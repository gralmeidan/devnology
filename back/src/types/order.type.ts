import Product, { ProductInput } from './product.type';

type Order<T extends Product | ProductInput | never = never> = {
  id: number;
  userId: number;
  totalPrice: number;
  products?: T[];
};

export default Order;
