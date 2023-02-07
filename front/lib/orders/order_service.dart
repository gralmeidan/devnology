import 'dart:convert';

import 'package:front/auth/authenticated_client.dart';
import 'package:front/cart/cart.dart';

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
}
