import 'package:flutter/material.dart';
import 'package:front/addresses/address_model.dart';
import 'package:front/addresses/new_address_form_view.dart';
import 'package:front/auth/sign_in_form_view.dart';
import 'package:front/auth/sign_up_form_view.dart';
import 'package:front/auth/user_model.dart';
import 'package:front/cart/cart_model.dart';
import 'package:front/orders/checkout/checkout_view.dart';
import 'package:front/orders/listing/orders_listing_view.dart';
import 'package:front/products_listing/products_listing_view.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => CartModel()),
        ChangeNotifierProvider(create: (context) => UserModel()),
        ChangeNotifierProvider(create: (context) => AddressModel()),
      ],
      child: const MainApp(),
    ),
  );
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      routes: {
        NewAddressFormView.route: (context) => const NewAddressFormView(),
        SignUpFormView.route: (context) => const SignUpFormView(),
        SignInFormView.route: (context) => const SignInFormView(),
        ProductsListingView.route: (context) => const ProductsListingView(),
        CheckoutView.route: (context) => const CheckoutView(),
        OrdersListingView.route: (context) => const OrdersListingView()
      },
    );
  }
}
