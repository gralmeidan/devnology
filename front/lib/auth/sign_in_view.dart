import 'package:flutter/material.dart';
import 'package:front/auth/sign_in_form.dart';

class SignInView extends StatelessWidget {
  static String route = '/signin';

  const SignInView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[350],
      body: const Center(
        child: SizedBox(
          width: 400,
          child: Card(
            child: Padding(
              padding: EdgeInsets.all(16.0),
              child: SignInForm(),
            ),
          ),
        ),
      ),
    );
  }
}
