import 'dart:convert';

import 'package:front/products_listing/product.dart';
import 'package:http/http.dart' as http;

class ProductService {
  static Future<List<Product>> _fetchAllFrom(
    String provider,
    String query,
  ) async {
    final response = await http.get(Uri.parse(
      'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/$provider$query',
    ));

    if (response.statusCode == 200) {
      return (jsonDecode(response.body) as List<dynamic>)
          .map((p) => Product.fromJSON(p))
          .toList();
    }

    throw Exception('Failed to fetch from $provider');
  }

  static Future<List<Product>> _fetchAllFromBrazilian(String query) {
    return _fetchAllFrom('brazilian_provider', '?nome=$query');
  }

  static Future<List<Product>> _fetchAllFromEuropean(String query) {
    return _fetchAllFrom('european_provider', '?name=$query');
  }

  static Future<List<Product>> fetchAll([String query = '']) async {
    final brazilianProducts = _fetchAllFromBrazilian(query);
    final europeanProducts = _fetchAllFromEuropean(query);

    final products = await Future.wait([brazilianProducts, europeanProducts]);

    return products.expand((p) => p).toList();
  }

  static Future<Product> fetchOne(int id, String provider) async {
    final response = await http.get(Uri.parse(
      'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/$provider/$id',
    ));

    return Product.fromJSON(jsonDecode(response.body));
  }

  const ProductService();
}
