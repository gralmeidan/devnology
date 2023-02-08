class Validator {
  // Class shouldn't be instantiated
  Validator._();

  static String? validateEmail(String? value) {
    final regexEmail = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');

    if (!regexEmail.hasMatch(value ?? '')) {
      return 'E-mail inválido';
    }
    return null;
  }

  static String? validatePassword(String? value) {
    if (value == null) {
      return 'Senha deve ser preenchida';
    }

    if (value.length < 6) {
      return 'Senha deve ter no mínimo 6 caracteres';
    }
    return null;
  }
}
