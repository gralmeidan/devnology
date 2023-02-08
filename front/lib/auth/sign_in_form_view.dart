import 'package:flutter/material.dart';
import 'package:front/auth/sign_up_form_view.dart';
import 'package:front/auth/user_model.dart';
import 'package:front/auth/user_service.dart';
import 'package:front/products_listing/products_listing_view.dart';
import 'package:front/utils/validator.dart';
import 'package:front/widgets/form_text_input.dart';
import 'package:front/widgets/layouts/form_layout.dart';
import 'package:provider/provider.dart';

class SignInFormView extends StatefulWidget {
  static String route = '/signin';

  const SignInFormView({super.key});

  @override
  State<SignInFormView> createState() => _SignInFormViewState();
}

class _SignInFormViewState extends State<SignInFormView> {
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
        Navigator.of(context).pushNamed(ProductsListingView.route);
      }
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
              validator: Validator.validateEmail,
              onSaved: (value) => _email = value,
              label: 'E-mail',
            ),
            FormTextInput(
              validator: Validator.validatePassword,
              onSaved: (value) => _password = value,
              label: 'Senha',
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
            ),
            Container(
              margin: const EdgeInsets.symmetric(vertical: 10.0),
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pushNamed(SignUpFormView.route);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.grey[300],
                  foregroundColor: Colors.black,
                ),
                child: const Text('Cadastrar'),
              ),
            )
          ],
        ),
      ),
    );
  }
}
