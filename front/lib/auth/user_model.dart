// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:front/auth/user.dart';

class UserModel extends ChangeNotifier {
  User? _user;

  UserModel() {
    final storedUser = html.window.localStorage['user'];

    if (storedUser != null) {
      _user = User.fromJson(jsonDecode(storedUser));
    }
  }

  int? get id => _user?.id;
  String? get firstName => _user?.firstName;
  String? get lastName => _user?.lastName;
  String? get email => _user?.email;
  String? get name => _user?.name;
  String? get initials => _user?.initials;
  bool get hasUser => _user != null;

  void setUser(User user) {
    _user = user;
    html.window.localStorage['user'] = jsonEncode(user);
    notifyListeners();
  }
}
