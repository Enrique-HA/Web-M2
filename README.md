# Busca-Serie

M2 · Async Odyssey — Web Development I.

## Funcionamiento
Mediante un buscador puedes obtener información sobre series. Dicha información está sacada de TVmaze mediante una API

## Uso de IA
Usé chatGpt principalmente para las partes de css, ya que no estaba tan interesado en la parte de cómo se ve. 
En el módulo de la api me ayudó con la sintaxis de localStorage; tenía claro la estructura de buscar al principio y registrar al final, pero 
necesitaba ayuda con control de errores. En el módulo render me ayudó con comprobaciones como "serie.image?.medium", y también me ayudó a quitar la marca de html
que la propia descripción de la serie traía

## Autopsia
1. En qué momento debe poder el usuario filtrar por género. Si lo podía hacer sin buscar, podría provocar fallos, y además la posible lista de géneros podría ser enorme.
Por ello, preferí que primero el usuario tuviese que buscar la serie. Una vez mostradas, se recogen los géneros de esas series expuestas, y entre esos elige el usuario
2. Cómo mostrar los datos por pantalla. En principio pensé en tener unas casillas fijas vacías, y que se fuesen llenando con la info pedida. Llegué a la conclusión de
que sería más sencillo si el JavaScript se encargase de crear unas "tarjetas" por cada resultado encontrado, y poder diseñar qué aspectos de la serie mostraría