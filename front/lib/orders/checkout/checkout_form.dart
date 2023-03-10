import 'package:flutter/material.dart';
import 'package:front/addresses/address_select.dart';
import 'package:front/cart/cart.dart';
import 'package:front/cart/cart_model.dart';
import 'package:front/orders/listing/orders_listing_view.dart';
import 'package:front/orders/order_service.dart';
import 'package:front/utils/show_err_dialog.dart';
import 'package:provider/provider.dart';

class CheckoutForm extends StatefulWidget {
  const CheckoutForm({super.key});

  @override
  State<CheckoutForm> createState() => _CheckoutFormState();
}

class _CheckoutFormState extends State<CheckoutForm> {
  final _formKey = GlobalKey<FormState>();
  int? _addressId;

  void _submit(UnmodifiableCart cart) async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      try {
        await OrderService.placeOrder(
          addressId: _addressId!,
          cart: cart,
        );

        if (context.mounted) {
          context.read<CartModel>().clear();
          Navigator.of(context).pushNamed(OrdersListingView.route);
        }
      } catch (e) {
        if (context.mounted) {
          showErrDialog(
            context: context,
            message: 'Tente novamente mais tarde',
          );
        }
      }
    }
  }

  String? _validateAddress(dynamic value) {
    if (value == null) {
      return 'Um endereço deve ser selecionado.';
    }

    if (value < 1 || value is! int) {
      return 'Endereço inválido.';
    }

    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: SizedBox(
        height: 120,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            AddressSelect(
              validator: _validateAddress,
              onSaved: (value) => _addressId = value,
            ),
            Container(
              margin: const EdgeInsets.symmetric(vertical: 10.0),
              width: double.infinity,
              child: Consumer<CartModel>(
                builder: (context, provider, child) {
                  final cart = provider.cart;
                  return ElevatedButton(
                    onPressed:
                        cart.products.length <= 0 ? null : () => _submit(cart),
                    child: const Text('Enviar'),
                  );
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
