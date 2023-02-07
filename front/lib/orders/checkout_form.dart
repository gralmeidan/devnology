import 'package:flutter/material.dart';
import 'package:front/addresses/address_select.dart';

class CheckoutForm extends StatefulWidget {
  const CheckoutForm({super.key});

  @override
  State<CheckoutForm> createState() => _CheckoutFormState();
}

class _CheckoutFormState extends State<CheckoutForm> {
  final _formKey = GlobalKey<FormState>();
  int? _addressId;

  void _submit() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
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
      child: AddressSelect(
        validator: _validateAddress,
        onSaved: (value) => _addressId = value,
      ),
    );
  }
}
