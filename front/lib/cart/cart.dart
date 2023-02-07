import 'dart:collection';

import 'package:front/products_listing/product.dart';

class Cart {
  late final Set<Product> _products;
  late final Map<int, int> _quantities;
  double _totalPrice = 0;

  Cart() {
    _products = {};
    _quantities = {};
  }

  Cart.fromSetAndMap(this._products, this._quantities) {
    for (var p in _products) {
      _totalPrice += p.price * (_quantities[p.id] ?? 0);
    }
  }

  UnmodifiableListView<Product> get products => UnmodifiableListView(_products);
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

  List toJson() {
    return products
        .map(
          (e) => {
            'id': e.id,
            'provider': e.provider,
            'quantity': quantities[e.id],
          },
        )
        .toList();
  }
}

class UnmodifiableCart {
  final Cart cart;

  UnmodifiableCart(this.cart);

  get products => cart.products;
  get quantities => cart.quantities;
  get totalPrice => cart.totalPrice;

  List toJson() => cart.toJson();
}
