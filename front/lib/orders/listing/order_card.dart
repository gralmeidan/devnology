import 'package:flutter/material.dart';
import 'package:front/orders/order.dart';
import 'package:front/utils/formatter.dart';

class OrderCard extends StatelessWidget {
  final Order order;

  const OrderCard({super.key, required this.order});

  @override
  Widget build(BuildContext context) {
    const textStyle = TextStyle(fontSize: 14.0);
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Card(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Text(
                    '#${order.id}',
                    style: TextStyle(
                      fontSize: textStyle.fontSize,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Expanded(
                    child: Text(
                      ' - ${order.address} ',
                      overflow: TextOverflow.ellipsis,
                      style: textStyle,
                    ),
                  ),
                  Text(
                    Formatter.money(order.cart.totalPrice),
                    style: textStyle,
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                width: double.infinity,
                child: DataTable(
                  columns: const [
                    DataColumn(label: Text('Produto')),
                    DataColumn(label: Text('Quantia'), numeric: true),
                  ],
                  rows: List<DataRow>.generate(
                    order.cart.products.length,
                    (index) {
                      final product = order.cart.products[index];
                      return DataRow(
                        cells: [
                          DataCell(Text(product.name)),
                          DataCell(Text(
                            order.cart.quantities[product.id].toString(),
                          )),
                        ],
                      );
                    },
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
