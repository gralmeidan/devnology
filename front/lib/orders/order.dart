import 'package:front/addresses/address.dart';
import 'package:front/cart/cart.dart';
import 'package:front/cart/cart_adapter.dart';

class Order {
  final int id;
  final int userId;
  final int addressId;
  final Address address;
  final Cart cart;

  Order({
    required this.id,
    required this.userId,
    required this.addressId,
    required this.address,
    required this.cart,
  });

  static Future<Order> fromJSON(Map<String, dynamic> json) async {
    final address = Address.fromJson(json['address']);

    final cart = await CartAdapter(json['products']).getCart();

    return Order(
      id: json['id'],
      userId: json['userId'],
      addressId: json['addressId'],
      address: address,
      cart: cart,
    );
  }
}
