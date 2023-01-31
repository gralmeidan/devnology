import 'package:flutter/material.dart';
import 'package:front/navigation/navigation_appbar_view.dart';

class CartView extends StatelessWidget {
  const CartView({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: NavigationAppBar(
        title: Text('Carrinho'),
      ),
      body: Center(
        child: Text('Foo'),
      ),
    );
  }
}
