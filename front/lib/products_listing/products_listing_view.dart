import 'package:flutter/material.dart';
import 'package:front/cart/cart_drawer.dart';
import 'package:front/navigation/navigation_appbar_view.dart';
import 'package:front/navigation/navigation_drawer_view.dart';
import 'package:front/products_listing/product.dart';
import 'package:front/products_listing/product_card.dart';
import 'package:front/products_listing/product_service.dart';

class ProductsListingView extends StatefulWidget {
  static String route = '/';

  const ProductsListingView({super.key});

  @override
  State<ProductsListingView> createState() => _ProductsListingView();
}

class _ProductsListingView extends State<ProductsListingView> {
  late Future<List<Product>> futureList;
  bool isSearchOpen = false;

  @override
  void initState() {
    super.initState();
    futureList = const ProductService().fetchAll();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const NavigationDrawerView(),
      endDrawer: const CartDrawer(),
      appBar: NavigationAppBar(
        title: isSearchOpen
            ? Expanded(
                child: TextField(
                  cursorColor: Colors.white,
                  style: const TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    enabledBorder: const UnderlineInputBorder(
                      borderSide: BorderSide(color: Colors.white),
                    ),
                    focusedBorder: const UnderlineInputBorder(
                      borderSide: BorderSide(color: Colors.white),
                    ),
                    hintStyle: TextStyle(color: Colors.grey[200]),
                    hintText: 'Pesquisa',
                  ),
                ),
              )
            : const Text('Produtos'),
        additionalActions: [
          IconButton(
            onPressed: () {
              setState(() {
                isSearchOpen = !isSearchOpen;
              });
            },
            icon: Icon(
              isSearchOpen ? Icons.search_off : Icons.search,
              size: 30,
            ),
          ),
        ],
      ),
      body: Center(
        child: FutureBuilder(
          future: futureList,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return ListView.builder(itemBuilder: (context, index) {
                return ProductCard(product: snapshot.data![index]);
              });
            } else if (snapshot.hasError) {
              return Text("$snapshot.error");
            }

            return const CircularProgressIndicator();
          },
        ),
      ),
    );
  }
}
