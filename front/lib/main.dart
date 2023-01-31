import 'package:flutter/material.dart';
import 'package:front/cart/cart_model.dart';
import 'package:front/cart/cart_view.dart';
import 'package:front/products_listing/products_listing_view.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(ChangeNotifierProvider(
    create: (context) => CartModel(),
    child: const MainApp(),
  ));
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      routes: {
        '/': (context) => const ProductsListingView(),
        '/cart': (cart) => const CartView()
      },
    );
  }
}
