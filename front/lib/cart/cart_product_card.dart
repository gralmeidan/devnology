import 'package:flutter/material.dart';
import 'package:front/cart/cart_model.dart';
import 'package:front/products_listing/product.dart';
import 'package:front/utils/formatter.dart';
import 'package:provider/provider.dart';

class CartProductCard extends StatelessWidget {
  final int quantity;
  final Product product;

  const CartProductCard({
    super.key,
    required this.product,
    required this.quantity,
  });

  @override
  Widget build(BuildContext context) {
    const gap = 10.0;
    return Card(
      elevation: 4.0,
      margin: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          SizedBox(
            height: 80,
            child: Padding(
              padding: const EdgeInsets.all(gap),
              child: Image.network(product.thumb),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(gap),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    product.name,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 22,
                    ),
                  ),
                  const SizedBox(height: gap),
                  Text(Formatter.money(product.price)),
                  const SizedBox(height: gap),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      IconButton(
                        onPressed: () => context.read<CartModel>().add(product),
                        icon: const Icon(Icons.add),
                      ),
                      const SizedBox(width: gap),
                      Text("$quantity"),
                      const SizedBox(width: gap),
                      IconButton(
                        onPressed: () =>
                            context.read<CartModel>().remove(product),
                        icon: const Icon(Icons.remove),
                      ),
                    ],
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
