import 'dart:convert';
import 'package:front/auth/authenticated_client.dart';
import 'package:front/auth/user.dart';

class UserService {
  static Future<User> signIn({
    required String email,
    required String password,
  }) async {
    final uri = Uri.parse('http://localhost:3001/signin');
    final client = AuthenticatedClient();

    final response = await client.post(
      uri,
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        "email": email,
        "password": password,
      }),
    );

    if (response.statusCode == 200) {
      return User.fromJson(jsonDecode(response.body));
    }

    throw Exception('Failed to login');
  }

  static Future<User> signUp({
    required String firstName,
    required String lastName,
    required String email,
    required String password,
  }) async {
    final uri = Uri.parse('http://localhost:3001/signup');
    final client = AuthenticatedClient();

    final response = await client.post(
      uri,
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 201) {
      return User.fromJson(jsonDecode(response.body));
    }

    throw Exception('Failed to register new user');
  }
}
