import 'package:flutter/material.dart';

class SignInView extends StatelessWidget {
  const SignInView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[350],
      body: const Center(
        child: SizedBox(
          width: 400,
          child: Card(child: Placeholder()),
        ),
      ),
    );
  }
}
