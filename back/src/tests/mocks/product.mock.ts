import Product, { ProductInput } from '../../types/product.type';

const input: ProductInput = {
  id: 3,
  provider: 'brazilian_provider',
  quantity: 7,
};

const output = {
  orderId: 2,
  productId: 3,
  providerId: 1,
  quantity: 7,
};

const INVALID_VALUES = [
  { ...input, id: 'NaN' },
  { ...input, id: undefined },
  { ...input, id: 0 },
  { ...input, id: -1 },
  { ...input, id: 3.14 },
  { ...input, quantity: 'NaN' },
  { ...input, quantity: undefined },
  { ...input, quantity: 0 },
  { ...input, quantity: -1 },
  { ...input, quantity: 3.14 },
  { ...input, provider: '' },
  { ...input, provider: undefined },
  { ...input, provider: 0 },
];

const productMocks = {
  input,
  INVALID_VALUES,
  output,
};

export default productMocks;
