import 'package:flutter/material.dart';
import 'package:front/auth/user.dart';

class UserModel extends ChangeNotifier {
  User? _user;

  int? get id => _user?.id;
  String? get firstName => _user?.firstName;
  String? get lastName => _user?.lastName;
  String? get email => _user?.email;
  String? get name => _user?.name;

  void setUser(User user) {
    _user = user;
    notifyListeners();
  }
}
