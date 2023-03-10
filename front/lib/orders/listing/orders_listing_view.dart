import 'dart:io';

import 'package:flutter/material.dart';
import 'package:front/navigation/navigation_appbar_view.dart';
import 'package:front/navigation/navigation_drawer_view.dart';
import 'package:front/orders/listing/order_card.dart';
import 'package:front/orders/order.dart';
import 'package:front/orders/order_service.dart';

class OrdersListingView extends StatefulWidget {
  static String route = '/orders';

  const OrdersListingView({super.key});

  @override
  State<OrdersListingView> createState() => _OrdersListingViewState();
}

class _OrdersListingViewState extends State<OrdersListingView> {
  late Future<List<Order>> futureList;

  @override
  void initState() {
    super.initState();
    futureList = OrderService.fetchAll();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const NavigationDrawerView(),
      appBar: const NavigationAppBar(
        title: Text('Pedidos'),
      ),
      body: Center(
        child: FutureBuilder(
          future: futureList,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              final data = snapshot.data!;
              return ListView.builder(
                itemCount: data.length,
                itemBuilder: (context, index) {
                  return OrderCard(order: data[index]);
                },
              );
            } else if (snapshot.hasError) {
              return Text(
                snapshot.error is HttpException
                    ? (snapshot.error as HttpException).message
                    : 'Algo deu errado',
              );
            }

            return const CircularProgressIndicator();
          },
        ),
      ),
    );
  }
}
