class Product {
  final int id;
  final String name;
  final String thumb;
  final List<String> gallery;
  final String description;
  final double price;
  final bool hasDiscount;
  final double discountValue;
  final List<String> tags;
  final String provider;

  Product({
    required this.id,
    required this.name,
    required this.thumb,
    required this.gallery,
    required this.description,
    required this.price,
    required this.tags,
    required this.provider,
    this.discountValue = 0,
    this.hasDiscount = false,
  });

  Product.fromEuropeanProvider(Map<String, dynamic> json)
      : this(
          id: int.parse(json["id"]),
          name: json["name"],
          thumb: json["gallery"][1],
          description: json["description"],
          price: double.parse(json["price"]),
          hasDiscount: json["hasDiscount"],
          gallery: // I don't know why but type assertions didn't work here.
              json["gallery"].map<String>((item) => item.toString()).toList(),
          discountValue: double.parse(json["discountValue"]),
          tags: [json["details"]["adjective"], json["details"]["material"]],
          provider: 'european_provider',
        );

  Product.fromBrazilianProvider(Map<String, dynamic> json)
      : this(
          id: int.parse(json["id"]),
          name: json["nome"],
          thumb: json["imagem"],
          description: json["descricao"],
          price: double.parse(json["preco"]),
          gallery: [json["imagem"]],
          tags: [json["material"], json["departamento"], json["categoria"]],
          provider: 'brazilian_provider',
        );

  factory Product.fromJSON(Map<String, dynamic> json) {
    if (json.containsKey("description")) {
      return Product.fromEuropeanProvider(json);
    }
    if (json.containsKey("descricao")) {
      return Product.fromBrazilianProvider(json);
    }

    throw Exception("Unsuported JSON");
  }
}
