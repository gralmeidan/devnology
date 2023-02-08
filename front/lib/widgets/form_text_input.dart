import 'package:flutter/material.dart';

class FormTextInput extends StatelessWidget {
  final String? Function(String?) validator;
  final void Function(String?)? onSaved;
  final String label;
  final Function? submit;
  final bool obscureText;

  const FormTextInput({
    super.key,
    required this.validator,
    required this.label,
    this.onSaved,
    this.submit,
    this.obscureText = false,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 70,
      child: TextFormField(
        obscureText: obscureText,
        validator: validator,
        onSaved: onSaved,
        decoration: InputDecoration(labelText: label),
        onEditingComplete: () {
          if (submit != null) {
            submit!();
          }
          FocusScope.of(context).nextFocus();
        },
      ),
    );
  }
}
