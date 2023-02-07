class Address {
  final int id;
  final int userId;
  final String street;
  final String number;
  final String city;
  final String cep;
  final String state;

  Address({
    required this.id,
    required this.userId,
    required this.street,
    required this.number,
    required this.city,
    required this.cep,
    required this.state,
  });

  Address.fromJson(Map<String, dynamic> json)
      : this(
          id: json["id"],
          userId: json["userId"],
          street: json["street"],
          number: json["number"],
          city: json["city"],
          cep: json["cep"],
          state: json["state"],
        );
}
