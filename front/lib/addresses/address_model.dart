import 'dart:collection';
import 'package:flutter/material.dart';
import 'package:front/addresses/address.dart';

class AddressModel extends ChangeNotifier {
  final List<Address> _list = [];

  UnmodifiableListView<Address> get addresses => UnmodifiableListView(_list);

  void setList(List<Address> list) {
    _list.clear();
    _list.addAll(list);
    notifyListeners();
  }

  void add(Address address) {
    _list.add(address);
    notifyListeners();
  }
}
