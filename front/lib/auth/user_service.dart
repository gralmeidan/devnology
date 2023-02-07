import 'dart:convert';

import 'package:front/auth/authenticated_client.dart';
import 'package:front/auth/user.dart';
import 'package:http/http.dart' as http;

class UserService {
  static Future<User> signIn({
    required String email,
    required String password,
  }) async {
    final uri = Uri.parse('http://localhost:3001/signin');

    final response = await http.post(
      uri,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': 'set-cookie'
      },
      body: jsonEncode({
        "email": email,
        "password": password,
      }),
    );

    if (response.statusCode == 200) {
      // On Flutter Web set-cookie should be handled by the browser, but if
      // it isn't then we'll handle it ourselves.
      if (response.headers['set-cookie'] != null) {
        final cookies =
            response.headers['set-cookie']!.split(';').map((e) => e.split('='));
        for (var cookie in cookies) {
          AuthenticatedClient().setCookie(cookie[0], cookie[1]);
        }
      }

      return User.fromJson(jsonDecode(response.body));
    }

    throw Exception('Failed to login');
  }
}
