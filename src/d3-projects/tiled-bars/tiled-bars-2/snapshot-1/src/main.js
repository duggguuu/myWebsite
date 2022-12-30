var tilesPerRow = 5;
var tileSize = 20;

function getTiles(num) {
  var tiles = [];

  for(var i = 0; i < num; i++) {
    var rowNumber = Math.floor(i / tilesPerRow);
    tiles.push({
      x: (i % tilesPerRow) * tileSize,
      y: -(rowNumber + 1) * tileSize
    });
  }

  return tiles
}

function updateBar(d) {
  var tiles = getTiles(d);

  var u = d3.select(".bar")
    .attr("transform", "translate(0, 300)")
    .selectAll("rect")
    .data(tiles);

  u.enter()
    .append("rect")
    .style("stroke", "white")
    .style("stroke-width", "0.5")
    .style("shape-rendering", "crispEdges")
    .merge(u)
    .attr("x", function(d) {
      return d.x;
    })
    .attr("y", function(d) {
      return d.y;
    })
    .attr("width", tileSize)
    .attr("height", tileSize);

  u.exit().remove();
}

updateBar(34);
