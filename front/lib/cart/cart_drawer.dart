import 'package:flutter/material.dart';
import 'package:front/cart/cart_model.dart';
import 'package:front/cart/cart_product_card.dart';
import 'package:provider/provider.dart';

class CartDrawer extends StatelessWidget {
  const CartDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return Drawer(
      width: screenWidth > 640 ? 640 : double.infinity,
      child: Column(
        children: [
          Align(
            alignment: Alignment.topLeft,
            child: IconButton(
              icon: const Icon(Icons.close),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ),
          Consumer<CartModel>(
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
          ),
        ],
      ),
    );
  }
}
