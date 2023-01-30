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

  Product({
    required this.id,
    required this.name,
    required this.thumb,
    required this.gallery,
    required this.description,
    required this.price,
    required this.tags,
    this.discountValue = 0,
    this.hasDiscount = false,
  });

  Product.fromEuropeanProvider(Map<String, dynamic> json)
      : this(
            id: json["id"],
            name: json["name"],
            thumb: json["gallery"]["1"],
            description: json["description"],
            price: json["price"],
            hasDiscount: json["hasDiscount"],
            gallery: json["gallery"],
            discountValue: json["discountValue"],
            tags: [json["details"]["adjective"], json["details"]["material"]]);

  Product.fromBrazilianProvider(Map<String, dynamic> json)
      : this(
            id: json["id"],
            name: json["nome"],
            thumb: json["imagem"],
            description: json["descricao"],
            price: json["preco"],
            gallery: [json["imagem"]],
            tags: [json["material"], json["departamento"], json["categoria"]]);

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
