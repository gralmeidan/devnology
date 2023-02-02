import 'dart:convert';

import 'package:front/products_listing/product.dart';
import 'package:http/http.dart' as http;

class ProductService {
  Future<List<Product>> _fetchAllEuropean() async {
    final response = await http.get(Uri.parse(
        'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider'));

    if (response.statusCode == 200) {
      return (jsonDecode(response.body) as List<dynamic>)
          .map((p) => Product.fromEuropeanProvider(p))
          .toList();
    }

    throw Exception('Failed to fetch from European Provider');
  }

  Future<List<Product>> _fetchAllBrazilian() async {
    final response = await http.get(Uri.parse(
        'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider'));

    if (response.statusCode == 200) {
      return (jsonDecode(response.body) as List<dynamic>)
          .map((p) => Product.fromBrazilianProvider(p))
          .toList();
    }

    throw Exception('Failed to fetch from Brazilian Provider');
  }

  Future<List<Product>> fetchAll() async {
    final brazilianProducts = _fetchAllBrazilian();
    final europeanProducts = _fetchAllEuropean();

    final products = await Future.wait([brazilianProducts, europeanProducts]);

    return products.expand((p) => p).toList();
  }

  const ProductService();
}
