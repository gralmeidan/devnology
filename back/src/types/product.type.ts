type Product = {
  id: number;
  quantity: number;
  provider: { id: number; name: string };
};

export default Product;

export type ProductInput = {
  id: number;
  quantity: number;
  provider: string;
};
