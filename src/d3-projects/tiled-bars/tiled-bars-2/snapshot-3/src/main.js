var tilesPerRow = 5;
var tileSize = 15;
var barPadding = 20;

var barWidth = (tilesPerRow * tileSize) + barPadding;

let colors = ["#ffd275", "#e8ae68", "#a57f60", "#e3a587", "#e48775"];

function initializeData() {
  data = data.map(function(d) {
    return {
      name: d.country,
      year: +d.year,
      age: +d.all
    }
  });
  data = data.filter(function(d) {
    return d.year === 2016;
  })
  data = data.slice(0, 10);
  console.log(data)
}

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

function updateBar(d, i) {
  var tiles = getTiles(d.age);

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

function initialize() {
  initializeData();
}

d3.tsv("data/life-expectancy-WHO-2000-2016-simplified.tsv", function(err, tsv) {
  data = tsv;

  initialize();
  updateBars();
});
