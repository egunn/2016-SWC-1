var width  = 500;
var height = 500;

var svg = d3.select("#map").append("svg")
  .attr("width", width)
  .attr("height", height);

var projection = d3.geoMercator().scale(1).translate([0,0]);

d3.json("simple-ma.json", function(data) {
  var path = d3.geoPath().projection(projection);
  var bounds = path.bounds(data);
  var scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width,
      (bounds[1][1] - bounds[0][1]) / height);
  var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
    (height - scale * (bounds[1][1] + bounds[0][1])) / 2];

  projection.scale(scale).translate(transl);

  svg.selectAll(".land")
    .data(data.features)
    .enter().append('path')
    .attr('class','land')
    .style("fill", "hsl(0,10%,60%")
    .attr("d", path);
});

d3.json("./noahs-geo.json", function(data) {

  svg.selectAll(".places")
    .data(data.features)
    .enter().append('circle')
    .attr('class','places')
    .style("fill", "black")
    .attr("r", 4)
    .attr("cx", function(data) {
      var x = projection(data.geometry.coordinates)[0];
      return x;
    })
    .attr("cy", function(data) {
      var y = projection(data.geometry.coordinates)[1];
      console.log(y);
      return y;
    } );
});


