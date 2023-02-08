import 'package:flutter/material.dart';
import 'package:front/auth/user_model.dart';
import 'package:provider/provider.dart';

class NavigationDrawerView extends StatelessWidget {
  const NavigationDrawerView({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          Consumer<UserModel>(
            builder: (context, value, child) {
              if (value.hasUser) {
                return UserAccountsDrawerHeader(
                  accountName: Text(value.name!),
                  accountEmail: Text(value.email!),
                  currentAccountPicture: CircleAvatar(
                    child: Text(value.initials!),
                  ),
                );
              }

              return DrawerHeader(
                decoration: const BoxDecoration(
                  color: Colors.blue,
                ),
                child: TextButton.icon(
                  onPressed: () {
                    Navigator.of(context).pushNamed('/');
                  },
                  icon: const Icon(
                    Icons.account_circle,
                    size: 48,
                    color: Colors.white,
                  ),
                  label: const Text(
                    'Entrar',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontFamily: 'Roboto',
                    ),
                  ),
                ),
              );
            },
          ),
          const _NavigationLink(
            label: 'Produtos',
            route: '/products',
          ),
          const _NavigationLink(
            label: 'Orders',
            route: '/orders',
          ),
        ],
      ),
    );
  }
}

class _NavigationLink extends StatelessWidget {
  final String label;
  final String route;

  const _NavigationLink({
    required this.label,
    required this.route,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(label),
      onTap: () {
        if (ModalRoute.of(context)?.settings.name != route) {
          Navigator.of(context).pushNamed(route);
        }
      },
    );
  }
}
