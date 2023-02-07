// Takes the entries from the database, fetches their information
// And saves them to a cart.
import 'package:front/cart/cart.dart';
import 'package:front/products_listing/product_service.dart';

class CartAdapter {
  final List<dynamic> entries;

  CartAdapter(this.entries);

  Future<Cart> getCart() async {
    Map<int, int> quantities = {};

    final futures = entries.map((entry) {
      quantities[entry['id']] = entry['quantity'];

      return ProductService.fetchOne(
        entry['id'],
        entry['provider']['name'],
      );
    });

    final products = await Future.wait(futures);

    return Cart.fromSetAndMap(products.toSet(), quantities);
  }
}
