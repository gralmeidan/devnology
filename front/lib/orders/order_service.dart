import 'dart:convert';
import 'dart:io';

import 'package:front/auth/authenticated_client.dart';
import 'package:front/cart/cart.dart';
import 'package:front/orders/order.dart';

class OrderService {
  static Future<void> placeOrder({
    required int addressId,
    required UnmodifiableCart cart,
  }) async {
    final uri = Uri.parse('http://localhost:3001/orders');
    final client = AuthenticatedClient();

    final response = await client.post(
      uri,
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'addressId': addressId,
        'products': cart,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to place order');
    }
  }

  static Future<List<Order>> fetchAll() async {
    final uri = Uri.parse('http://localhost:3001/orders');
    final client = AuthenticatedClient();

    final response = await client.get(uri, headers: {
      'Content-Type': 'application/json',
    });

    if (response.statusCode == 401) {
      throw HttpException('É preciso estar logado para resgatar pedidos');
    }

    if (response.statusCode != 200) {
      throw Exception('Failed to fetch orders');
    }

    final decoded = jsonDecode(response.body) as List<dynamic>;

    final orders = await Future.wait(
      decoded.map((p) => Order.fromJSON(p)).toList(),
    );

    return orders;
  }
}
