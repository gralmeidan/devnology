import 'package:flutter/material.dart';
import 'package:front/auth/user_model.dart';
import 'package:front/auth/user_service.dart';
import 'package:provider/provider.dart';

class SignInForm extends StatefulWidget {
  const SignInForm({super.key});

  @override
  State<SignInForm> createState() => _SignInFormState();
}

class _SignInFormState extends State<SignInForm> {
  final _formKey = GlobalKey<FormState>();
  String? _email;
  String? _password;

  void _submit() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      final user = await UserService.signIn(
        email: _email!,
        password: _password!,
      );

      if (context.mounted) {
        context.read<UserModel>().setUser(user);
        Navigator.of(context).pushNamed('/products');
      }
    }
  }

  String? _validateEmail(String? value) {
    final regexEmail = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');

    if (!regexEmail.hasMatch(value ?? '')) {
      return 'E-mail inválido';
    }
    return null;
  }

  String? _validatePassword(String? value) {
    if (value == null) {
      return 'Senha deve ser preenchida';
    }

    if (value.length < 6) {
      return 'Senha deve ter no mínimo 6 caracteres';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            height: 70,
            child: TextFormField(
              validator: _validateEmail,
              onSaved: (value) => _email = value,
              decoration: const InputDecoration(labelText: 'E-mail'),
              onEditingComplete: () {
                FocusScope.of(context).nextFocus();
              },
            ),
          ),
          SizedBox(
            height: 70,
            child: TextFormField(
              obscureText: true,
              validator: _validatePassword,
              onSaved: (value) => _password = value,
              decoration: const InputDecoration(labelText: 'Senha'),
              onEditingComplete: _submit,
            ),
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
