import 'package:http/browser_client.dart';
import 'package:http/http.dart' as http;

class AuthenticatedClient extends http.BaseClient {
  // Singleton logic
  factory AuthenticatedClient() => _instance;
  AuthenticatedClient._();
  static final _instance = AuthenticatedClient._();

  // Client logic
  final http.Client _inner = http.Client();
  final List<Cookie> _cookies = [];

  void setCookie(String name, String value) {
    _cookies.add(Cookie(name, value));
  }

  // Customize all requests made from this client
  @override
  Future<http.StreamedResponse> send(http.BaseRequest request) async {
    if (_inner is BrowserClient) {
      (_inner as BrowserClient).withCredentials = true;
    } else {
      request.headers['Cookie'] = _cookies.join(';');
    }

    return _inner.send(request);
  }
}

class Cookie {
  String name;
  String value;

  Cookie(this.name, this.value);

  @override
  String toString() {
    return '$name=$value';
  }
}
