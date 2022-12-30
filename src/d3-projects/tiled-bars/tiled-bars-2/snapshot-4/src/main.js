var tilesPerRow = 5;
var tileSize = 15;
var barPadding = 20;
var maxValue = 100;
var numVisibleCountries = 10;

var barWidth = (tilesPerRow * tileSize) + barPadding;

var data;
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

function updateLabel(d) {
  var el = d3.select(this)
    .select("text");

  if(el.empty()) {
    el = d3.select(this)
      .append("text")
      .attr("y", -4)
      .attr("transform", "rotate(-90)")
      .style("font-weight", "bold")
      .style("font-size", "12px")
      .style("fill", "#777");
  }

  el.text(d.name);
}

// Horizontal labels
// function updateLabel(d) {
//   var el = d3.select(this)
//     .select("text");
//
//   if(el.empty()) {
//     el = d3.select(this)
//       .append("text")
//       .attr("x", 0.5 * tilesPerRow * tileSize)
//       .attr("y", 15)
//       .style("font-weight", "bold")
//       .style("text-anchor", "middle")
//       .style("font-size", "11px")
//       .style("fill", "#777");
//   }
//
//   let label = d.name.length > 12 ? d.name.slice(0, 12) + '...' : d.name;
//   el.text(label);
// }

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
    .each(updateBar)
    .each(updateLabel);

  u.exit().remove();
}

function updateAxis() {
  var chartWidth = numVisibleCountries * barWidth;
  var chartHeight = (maxValue / tilesPerRow) * tileSize;

  var yScale = d3.scaleLinear().domain([0, maxValue]).range([chartHeight, 0]);
  var yAxis = d3.axisRight().scale(yScale).tickSize(chartWidth);

  d3.select(".y.axis")
    .call(yAxis);
}

function initialize() {
  initializeData();
}

d3.tsv("data/life-expectancy-WHO-2000-2016-simplified.tsv", function(err, tsv) {
  data = tsv;

  initialize();
  updateBars();
  updateAxis();
});
