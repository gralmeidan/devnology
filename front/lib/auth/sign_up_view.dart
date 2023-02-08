import 'package:flutter/material.dart';
import 'package:front/auth/sign_up_form.dart';

class SignUpView extends StatelessWidget {
  static String route = '/signup';

  const SignUpView({super.key});

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
              child: SignUpForm(),
            ),
          ),
        ),
      ),
    );
  }
}
