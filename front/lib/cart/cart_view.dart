import 'package:flutter/material.dart';
import 'package:front/cart/cart_model.dart';
import 'package:front/cart/cart_product_card.dart';
import 'package:front/navigation/navigation_appbar_view.dart';
import 'package:provider/provider.dart';

class CartView extends StatelessWidget {
  const CartView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const NavigationAppBar(
        title: Text('Carrinho'),
      ),
      body: Center(
        child: Consumer<CartModel>(
          builder: (context, cart, child) {
            return ListView.builder(
              itemCount: cart.cart.products.length,
              itemBuilder: (context, index) {
                final product = cart.cart.products[index];
                return CartProductCard(
                  product: product,
                );
              },
            );
          },
        ),
      ),
    );
  }
}
