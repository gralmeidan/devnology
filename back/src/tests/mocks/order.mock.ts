import Order from '../../types/order.type';
import Product, { ProductInput } from '../../types/product.type';
import addressMocks from './address.mock';
import productMocks from './product.mock';

const input: Required<Omit<Order<ProductInput>, 'id' | 'address'>> = {
  userId: 1,
  addressId: 2,
  products: Array(3).fill(productMocks.input),
};

const createOutput: Order = {
  id: 2,
  userId: 1,
  addressId: 2,
};

const INVALID_VALUES = [
  { ...input, userId: 'NaN' },
  { ...input, userId: undefined },
  { ...input, userId: 0 },
  { ...input, userId: -1 },
  { ...input, userId: 2.3 },
  { ...input, addressId: 'NaN' },
  { ...input, addressId: undefined },
  { ...input, addressId: -1 },
  { ...input, addressId: 0 },
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
  addressId: 1,
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
  address: addressMocks.output,
};

const orderMocks = {
  input,
  createOutput,
  INVALID_VALUES,
  output,
  arrOutput: Array(3).fill(output),
};

export default orderMocks;
