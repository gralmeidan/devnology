import 'package:flutter/material.dart';

Future<void> showErrDialog({
  required BuildContext context,
  required String message,
  String title = 'Algo deu errado',
}) async {
  return showDialog(
    context: context,
    builder: (BuildContext ctx) {
      return AlertDialog(
        title: Text(title),
        content: SingleChildScrollView(
          child: Text(message),
        ),
      );
    },
  );
}
