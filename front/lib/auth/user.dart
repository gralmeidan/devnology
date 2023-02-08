class User {
  final int id;
  final String firstName;
  final String lastName;
  final String email;

  User({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.email,
  });

  User.fromJson(Map<String, dynamic> json)
      : this(
          id: json["id"],
          firstName: json["firstName"],
          lastName: json["lastName"],
          email: json["email"],
        );

  String get name {
    return '$firstName $lastName';
  }

  String get initials {
    return firstName[0] + lastName[0];
  }

  Map toJson() => {
        'id': id,
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
      };
}
