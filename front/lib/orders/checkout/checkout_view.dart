import 'package:flutter/material.dart';
import 'package:front/cart/cart_listing.dart';
import 'package:front/navigation/navigation_appbar_view.dart';
import 'package:front/orders/checkout/checkout_form.dart';

class CheckoutView extends StatelessWidget {
  static String route = '/checkout';

  const CheckoutView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const NavigationAppBar(
        title: Text('Checkout'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: const [
              Align(
                alignment: Alignment.topLeft,
                child: Text(
                  'Revise seu carrinho:',
                  style: TextStyle(fontSize: 26),
                ),
              ),
              CartListing(),
              CheckoutForm()
            ],
          ),
        ),
      ),
    );
  }
}
