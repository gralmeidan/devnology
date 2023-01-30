import 'package:flutter/material.dart';
import 'package:front/products_listing/products_listing_view.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: {
        '/': (context) => const ProductsListingView(),
      },
    );
  }
}
