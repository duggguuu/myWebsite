var tilesPerRow = 5;
var tileSize = 20;
var barPadding = 20;

var barWidth = (tilesPerRow * tileSize) + barPadding;

let colors = ["#ffd275", "#e8ae68", "#a57f60", "#e3a587", "#e48775"];
var data = [42, 34, 12, 17, 53];

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

function updateBar(num, i) {
  var tiles = getTiles(num);

  var u = d3.select(this)
    .attr("transform", "translate(" + i * barWidth + ", 300)")
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

function updateBars() {
  var u = d3.select("g.bars")
    .selectAll("g")
    .data(data);

  u.enter()
    .append("g")
    .merge(u)
    .style("fill", function(d, i) {
      return colors[i % colors.length];
    })
    .each(updateBar);

  u.exit().remove();
}

updateBars();
