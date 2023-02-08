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

  static Future<Address> post({
    required String street,
    required String number,
    required String city,
    required String cep,
    required String state,
  }) async {
    final uri = Uri.parse('http://localhost:3001/address');
    final client = AuthenticatedClient();

    final response = await client.post(
      uri,
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'street': street,
        'number': number,
        'city': city,
        'cep': cep,
        'state': state,
      }),
    );

    if (response.statusCode == 201) {
      return Address.fromJson(jsonDecode(response.body));
    }

    throw Exception('Failed to post address');
  }
}
