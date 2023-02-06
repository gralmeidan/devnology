import 'package:flutter/material.dart';
import 'package:front/auth/user.service.dart';

class SignInForm extends StatefulWidget {
  const SignInForm({super.key});

  @override
  State<SignInForm> createState() => _SignInFormState();
}

class _SignInFormState extends State<SignInForm> {
  final _formKey = GlobalKey<FormState>();
  String? _email;
  String? _password;

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
            ),
          ),
          SizedBox(
            height: 70,
            child: TextFormField(
              obscureText: true,
              validator: _validatePassword,
              onSaved: (value) => _password = value,
              decoration: const InputDecoration(labelText: 'Senha'),
            ),
          ),
          Container(
            margin: const EdgeInsets.symmetric(vertical: 10.0),
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () async {
                if (_formKey.currentState!.validate()) {
                  _formKey.currentState!.save();
                  await UserService.signIn(
                    email: _email!,
                    password: _password!,
                  );

                  if (context.mounted) {
                    Navigator.of(context).pushNamed('/products');
                  }
                }
              },
              child: const Text('Enviar'),
            ),
          )
        ],
      ),
    );
  }
}
