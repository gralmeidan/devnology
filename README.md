# Desafio técnico Devnology.

## Processo de desenvolvimento

Como esse foi o meu primeiro projeto usando Flutter e Dart, meu primeiro passo foi ler a documentação para ambas, em especial as páginas que tratam sobre a transição [de JavaScript para Dart](https://dart.dev/guides/language/coming-from/js-to-dart) e [de HTML/CSS para Flutter](https://docs.flutter.dev/get-started/flutter-for/web-devs).

Após isso eu comecei criando a classe que representaria o Produto, juntamente com a que farias as requisições para à API, nesse ponto eu achei mais interessante juntar os resultados de ambas APIs, do que criar uma tela diferente para cada uma, pois raramente se separa resultados por provedor em outros sites de e-commerce.

Finalizando o funcionamento básico da tela de produtos, eu resolvi usar o ChangeNotifier da biblioteca "Provider" para gerenciar o estado do carrinho da aplicação, pois se assemelha ao Context API do React, que eu já tenho familiaridade. Inicialmente implementei uma classe Cart aplicando o _Deisgn Pattern_ _Iterable_, mas no fim considerei desnecessário e reverti para uma classe comum.
