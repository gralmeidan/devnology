class Validator {
  // Class shouldn't be instantiated
  Validator._();

  static String? validateString(String? value) {
    if (value == null || value.isEmpty) {
      return 'Campo deve ser preenchido';
    }

    if (value.length > 255) {
      return 'Campo não pode passar de 255 caracteres';
    }

    return null;
  }

  static String? validateEmail(String? value) {
    final regexEmail = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    final typeValidation = validateString(value);

    if (typeValidation != null) return typeValidation;

    if (!regexEmail.hasMatch(value!)) {
      return 'E-mail inválido';
    }

    return null;
  }

  static String? validatePassword(String? value) {
    final typeValidation = validateString(value);

    if (typeValidation != null) return typeValidation;

    if (value!.length < 6) {
      return 'Campo deve ter no mínimo 6 caracteres';
    }
    return null;
  }

  static String? validateRepeatPassword(String? value, String? password) {
    final typeValidation = validateString(value);

    if (typeValidation != null) return typeValidation;

    if (value != password) {
      return 'Senhas não idênticas';
    }

    return null;
  }

  static String? validateCep(String? value) {
    final regexCep = RegExp(r'^\d{5}-\d{3}$');
    final typeValidation = validateString(value);

    if (typeValidation != null) return typeValidation;

    if (!regexCep.hasMatch(value!)) {
      return 'CEP deve ter o formato 00000-000';
    }

    return null;
  }

  static String? validateState(String? value) {
    final regexState = RegExp(r'^\w{2}$');
    final typeValidation = validateString(value);

    if (typeValidation != null) return typeValidation;

    if (!regexState.hasMatch(value!)) {
      return 'Estado deve estar em sigla. Ex: MT, MS, RJ...';
    }

    return null;
  }
}
