import 'package:flutter/material.dart';
import 'package:front/utils/validator.dart';
import 'package:front/widgets/form_text_input.dart';
import 'package:front/widgets/layouts/form_layout.dart';

class NewAddressFormView extends StatefulWidget {
  static String route = '/new/address';

  const NewAddressFormView({super.key});

  @override
  State<NewAddressFormView> createState() => _NewAddressFormViewState();
}

class _NewAddressFormViewState extends State<NewAddressFormView> {
  final _formKey = GlobalKey<FormState>();
  String? _street;
  String? _number;
  String? _city;
  String? _cep;
  String? _state;

  void _submit() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
    }
  }

  @override
  Widget build(BuildContext context) {
    return FormLayout(
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            FormTextInput(
              validator: Validator.validateString,
              onSaved: (value) => _street = value,
              label: 'Endereço',
            ),
            FormTextInput(
              validator: Validator.validateString,
              onSaved: (value) => _number = value,
              label: 'Número',
            ),
            FormTextInput(
              validator: Validator.validateString,
              onSaved: (value) => _city = value,
              label: 'Cidade',
            ),
            FormTextInput(
              validator: Validator.validateCep,
              onSaved: (value) => _cep = value,
              label: 'CEP',
            ),
            FormTextInput(
              validator: Validator.validateState,
              onSaved: (value) => _state = value,
              label: 'Estado',
              submit: _submit,
            ),
            Container(
              margin: const EdgeInsets.symmetric(vertical: 10.0),
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _submit,
                child: const Text('Enviar'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
