import 'package:flutter/material.dart';
import 'package:front/cart/cart_model.dart';
import 'package:front/products_listing/product.dart';
import 'package:provider/provider.dart';

class CartProductCard extends StatelessWidget {
  final Product product;

  const CartProductCard({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4.0,
      margin: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          SizedBox(
            height: 80,
            child: Image.network(product.thumb),
          ),
          SizedBox(
            height: 80,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
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
                  const SizedBox(height: 8),
                  Text(
                    "R\$ ${product.price.toStringAsFixed(2)}",
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
