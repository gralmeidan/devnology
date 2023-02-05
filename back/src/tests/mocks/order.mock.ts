import Order from '../../types/order.type';
import Product, { ProductInput } from '../../types/product.type';
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

const output: Order<Product> = {
  id: 1,
  userId: 1,
  totalPrice: 20,
  products: [
    {
      id: 1,
      quantity: 1,
      provider: { id: 1, name: 'brazilian_provider' },
    },
    {
      id: 1,
      quantity: 2,
      provider: { id: 2, name: 'european_provider' },
    },
  ],
};

const orderMocks = {
  input,
  createOutput,
  INVALID_VALUES,
  output,
  arrOutput: Array(3).fill(output),
};

export default orderMocks;
