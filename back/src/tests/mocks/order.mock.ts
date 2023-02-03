import Order from '../../types/order.type';
import { ProductInput } from '../../types/product.type';
import productMocks from './product.mock';

const input: Required<Omit<Order<ProductInput>, 'id'>> = {
  userId: 1,
  totalPrice: 42.0,
  products: Array(3).fill(productMocks.input),
};

const createOutput: Order = {
  id: 2,
  userId: 1,
  totalPrice: 42.0,
};

const INVALID_VALUES = [
  { ...input, userId: 'NaN' },
  { ...input, userId: undefined },
  { ...input, userId: 0 },
  { ...input, userId: -1 },
  { ...input, userId: 2.3 },
  { ...input, totalPrice: 'NaN' },
  { ...input, totalPrice: undefined },
  { ...input, totalPrice: -1 },
  { ...input, products: undefined },
  { ...input, products: [] },
  ...productMocks.INVALID_VALUES.map(products => ({
    ...input,
    products,
  })),
];

const orderMocks = {
  input,
  createOutput,
  INVALID_VALUES,
};

export default orderMocks;
