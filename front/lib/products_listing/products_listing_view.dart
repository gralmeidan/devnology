import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:front/navigation/navigation_appbar_view.dart';
import 'package:front/products_listing/product.dart';
import 'package:front/products_listing/product_card.dart';
import 'package:front/products_listing/product_service.dart';

class ProductsListingView extends StatefulWidget {
  const ProductsListingView({super.key});

  @override
  State<ProductsListingView> createState() => _ProductsListingView();
}

class _ProductsListingView extends State<ProductsListingView> {
  late Future<List<Product>> futureList;

  @override
  void initState() {
    super.initState();
    futureList = const ProductService().fetchAll();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const NavigationAppBar(
        title: Text('Produtos'),
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
