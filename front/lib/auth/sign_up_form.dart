import 'package:flutter/material.dart';
import 'package:front/auth/user_model.dart';
import 'package:front/auth/user_service.dart';
import 'package:front/products_listing/products_listing_view.dart';
import 'package:front/utils/validator.dart';
import 'package:front/widgets/form_text_input.dart';
import 'package:provider/provider.dart';

class SignUpForm extends StatefulWidget {
  const SignUpForm({super.key});

  @override
  State<SignUpForm> createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  final _formKey = GlobalKey<FormState>();
  String? _firstName;
  String? _lastName;
  String? _email;
  String? _password;

  void _submit() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          FormTextInput(
            validator: Validator.validateString,
            onSaved: (value) => _firstName = value,
            label: 'Nome',
          ),
          FormTextInput(
            validator: Validator.validateString,
            onSaved: (value) => _lastName = value,
            label: 'Sobrenome',
          ),
          FormTextInput(
            validator: Validator.validateEmail,
            onSaved: (value) => _email = value,
            label: 'E-mail',
          ),
          FormTextInput(
            validator: Validator.validatePassword,
            onSaved: (value) => _password = value,
            label: 'Senha',
            obscureText: true,
          ),
          FormTextInput(
            validator: (value) {
              _formKey.currentState!.save();
              return Validator.validateRepeatPassword(value, _password);
            },
            label: 'Repetir senha',
            obscureText: true,
            submit: _submit,
          ),
          Container(
            margin: const EdgeInsets.symmetric(vertical: 10.0),
            width: double.infinity,
            child: ElevatedButton(
              onPressed: _submit,
              child: const Text('Enviar'),
            ),
          )
        ],
      ),
    );
  }
}
