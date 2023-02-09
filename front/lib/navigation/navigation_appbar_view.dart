import 'package:flutter/material.dart';

class NavigationAppBar extends StatelessWidget implements PreferredSizeWidget {
  final List<Widget> additionalActions;
  final Widget title;

  @override
  Size get preferredSize => const Size.fromHeight(60);

  const NavigationAppBar({
    super.key,
    this.additionalActions = const [],
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: title,
      actions: [
        ...additionalActions,
        if (Scaffold.of(context).hasEndDrawer)
          Padding(
            padding: const EdgeInsets.only(right: 20),
            child: IconButton(
              onPressed: () {
                Scaffold.of(context).openEndDrawer();
              },
              icon: const Icon(
                Icons.shopping_cart,
                size: 30,
              ),
            ),
          ),
      ],
    );
  }
}
