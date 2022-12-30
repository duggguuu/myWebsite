var tilesPerRow = 5;
var tileSize = 15;
var barPadding = 20;
var maxValue = 100;
var numVisibleCountries = 10;

var barWidth = (tilesPerRow * tileSize) + barPadding;

var data, filteredData;
let colors = ["#B71C1C", "#951d1d", "#711f1f", "#502020", "#212121"];

var selectedYear = 2016, selectedMode = "top10";

function initializeData() {
  data = data.map(function(d) {
    return {
      name: d.country,
      year: +d.year,
      age: +d.all
    }
  });
}

function updateFilteredData() {
  filteredData = data.filter(function(d) {
    return d.year === selectedYear;
  });
  filteredData = _.sortBy(filteredData, function(d) {
    return selectedMode === "top10" ? -d.age : d.age;
  });
  filteredData = filteredData.slice(0, numVisibleCountries);
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
    .style("opacity", 0)
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
    .attr("height", tileSize)
    .transition()
    .delay(function(d, i) {
      return i * 20;
    })
    .style("opacity", 1);


  u.exit()
    .transition()
    .delay(function(d, i) {
      return (100 - i) * 20;
    })
    .style("opacity", 0)
    .on("end", function() {
      d3.select(this).remove();
    });
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
      .style("fill", "#212121");
  }

  el.text(d.name);
}

function updateBars() {
  var u = d3.select("g.bars")
    .selectAll("g")
    .data(filteredData);

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

  d3.select("select.mode")
    .on("change", function() {
      selectedMode = this.value;
      update();
    })

  d3.select("select.year")
    .on("change", function() {
      selectedYear = +this.value;
      update();
    });
}

function update() {
  updateFilteredData();
  updateBars();
  updateAxis();
}

d3.tsv("d3-projects/tiled-bars/data/life-expectancy-WHO-2000-2016-simplified.tsv", function(err, tsv) {
  data = tsv;

  initialize();
  update();
});
