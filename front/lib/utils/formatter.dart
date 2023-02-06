import 'package:intl/intl.dart';

class Formatter {
  // Class shouldn't be instantiated
  Formatter._();

  static final _moneyFormatter = NumberFormat.currency(
    locale: 'pt_BR',
    symbol: 'R\$',
  );

  static String money(num amount) {
    return _moneyFormatter.format(amount);
  }
}
