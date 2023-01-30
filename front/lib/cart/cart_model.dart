import 'package:flutter/material.dart';
import 'package:front/cart/cart.dart';
import 'package:front/products_listing/product.dart';

class CartModel extends ChangeNotifier {
  final Cart _cart = Cart({});

  UnmodifiableCart get cart => UnmodifiableCart(_cart);

  void add(Product product) {
    _cart.add(product);
    notifyListeners();
  }

  void remove(Product product) {
    _cart.remove(product);
    notifyListeners();
  }
}
