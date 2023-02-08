import 'package:flutter/material.dart';
import 'package:front/addresses/address.dart';
import 'package:front/addresses/address_model.dart';
import 'package:front/addresses/address_service.dart';
import 'package:front/addresses/new_address_form_view.dart';
import 'package:provider/provider.dart';

class AddressSelect extends StatefulWidget {
  final String? Function(dynamic) validator;
  final void Function(dynamic) onSaved;

  const AddressSelect({
    super.key,
    required this.validator,
    required this.onSaved,
  });

  @override
  State<AddressSelect> createState() => _AddressSelectState();
}

class _AddressSelectState extends State<AddressSelect> {
  late Future<List<Address>> futureList;
  int? selectedValue;

  Future<List<Address>> fetchAddresses() async {
    final response = await AddressService.fetchAll();

    if (response.isNotEmpty) {
      selectedValue = response[0].id;

      if (context.mounted) {
        context.read<AddressModel>().setList(response);
      }
    }

    return response;
  }

  @override
  void initState() {
    super.initState();
    futureList = fetchAddresses();
  }

  DropdownMenuItem<dynamic> toMenuItem(Address address) {
    return DropdownMenuItem(
      value: address.id,
      child: Text(address.toString()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: FutureBuilder(
            future: futureList,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Consumer<AddressModel>(
                  builder: (context, value, child) {
                    return DropdownButtonFormField(
                      validator: widget.validator,
                      onSaved: widget.onSaved,
                      value: selectedValue,
                      items: value.addresses.map((e) => toMenuItem(e)).toList(),
                      onChanged: (dynamic e) {
                        setState(() {
                          selectedValue = e;
                        });
                      },
                      decoration: const InputDecoration(labelText: 'Endereço'),
                    );
                  },
                );
              } else if (snapshot.hasError) {
                return Text("$snapshot.error");
              }

              return const CircularProgressIndicator();
            },
          ),
        ),
        Center(
          child: IconButton(
            onPressed: () {
              Navigator.of(context).pushNamed(NewAddressFormView.route);
            },
            icon: const Icon(Icons.add),
          ),
        )
      ],
    );
  }
}
