type Order = {
  id: number;
  userId: number;
  totalPrice: number;
  products?: [
    {
      id: number;
      quantity: number;
      provider: { id: number; name: string };
    }
  ];
};

export default Order;
