import 'package:flutter/material.dart';
import 'package:front/cart/cart_listing.dart';
import 'package:front/cart/cart_model.dart';
import 'package:front/utils/formatter.dart';
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
            alignment: Alignment.topRight,
            child: IconButton(
              icon: const Icon(Icons.close),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ),
          const CartListing(),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Consumer<CartModel>(
                  builder: (context, cart, child) {
                    return Text(
                      Formatter.money(cart.cart.totalPrice),
                      style: const TextStyle(fontSize: 18),
                    );
                  },
                ),
                IconButton(
                  onPressed: () {
                    Navigator.of(context).pushNamed('/checkout');
                  },
                  icon: const Icon(Icons.shopping_cart_checkout),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
