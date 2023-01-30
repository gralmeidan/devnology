import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:front/products_listing/product.dart';

class CartModel extends ChangeNotifier {
  final List<Product> _products = [];
  double _totalPrice = 0;

  UnmodifiableListView<Product> get products => UnmodifiableListView(_products);

  double get totalPrice => _totalPrice;

  void add(Product product) {
    _products.add(product);
    _totalPrice += product.price;
    notifyListeners();
  }

  void remove(Product product) {
    _products.remove(product);
    _totalPrice -= product.price;
    notifyListeners();
  }
}
