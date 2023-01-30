import 'dart:collection';

import 'package:front/products_listing/product.dart';

class Cart {
  final Set<Product> _products;
  final Map<int, int> _quantities = {};
  double _totalPrice = 0;

  Cart(this._products);

  UnmodifiableSetView<Product> get products => UnmodifiableSetView(_products);
  UnmodifiableMapView<int, int> get quantities =>
      UnmodifiableMapView(_quantities);
  double get totalPrice => _totalPrice;

  void add(Product product) {
    _products.add(product);

    _quantities[product.id] = (_quantities[product.id] ?? 0) + 1;
    _totalPrice += product.price;
  }

  void remove(Product product) {
    if (_quantities[product.id] == null) {
      return;
    }

    if (_quantities[product.id]! - 1 > 0) {
      _quantities[product.id] = _quantities[product.id]! - 1;
    } else {
      _quantities.remove(product.id);
      _products.remove(product);
    }

    _totalPrice -= product.price;
  }
}

class UnmodifiableCart {
  final Cart cart;

  UnmodifiableCart(this.cart);

  get products => cart.products;
  get quantities => cart.quantities;
  get totalPrice => cart.totalPrice;
}
