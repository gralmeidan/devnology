import 'package:flutter/material.dart';
import 'package:front/cart/cart_model.dart';
import 'package:front/cart/cart_product_card.dart';
import 'package:provider/provider.dart';

class CartListing extends StatelessWidget {
  const CartListing({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<CartModel>(
      builder: (context, cart, child) {
        return Expanded(
          child: ListView.builder(
            padding: EdgeInsets.zero,
            itemCount: cart.cart.products.length,
            itemBuilder: (context, index) {
              final product = cart.cart.products[index];
              return CartProductCard(
                product: product,
                quantity: cart.cart.quantities[product.id],
              );
            },
          ),
        );
      },
    );
  }
}
