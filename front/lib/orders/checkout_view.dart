import 'package:flutter/material.dart';
import 'package:front/navigation/navigation_appbar_view.dart';

class CheckoutView extends StatelessWidget {
  const CheckoutView({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: NavigationAppBar(
        title: Text('Checkout'),
      ),
    );
  }
}
