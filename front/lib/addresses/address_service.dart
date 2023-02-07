import 'dart:convert';

import 'package:front/addresses/address.dart';
import 'package:front/auth/authenticated_client.dart';

class AddressService {
  static Future<List<Address>> fetchAll() async {
    final uri = Uri.parse('http://localhost:3001/address');
    final client = AuthenticatedClient();

    final response = await client.get(uri, headers: {
      'Content-Type': 'application/json',
    });

    if (response.statusCode == 200) {
      return (jsonDecode(response.body) as List<dynamic>)
          .map((json) => Address.fromJson(json))
          .toList();
    }
    throw Exception('Failed to fetch addresses');
  }
}
