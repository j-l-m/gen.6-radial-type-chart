# gen.6-radial-type-chart
A radial design of the Pokemon Type matchup chart


The aim was to make a type chart that is easier to read than the standard tabular/matrix charts (e.g  https://img.pokemondb.net/images/typechart-gen2345.png ).

Chart is interactive, values change depending on the type selected.

Uses Highcharts.js 


######How to use:
- open the html file.
- click on the desired type.
- The values on the outer ring are the attack effectiveness multipliers of the selected type vs. every type.
- The values on the inner ring are the defense effectiveness multipliers of every type vs. the selected type.

Note: AttackOnly.html only has the outer ring for attack effectiveness, where as AttackAndDefense.html shows both.

Working Demo here:
<script async src="//jsfiddle.net/jL29o6x4/embed/"></script>
