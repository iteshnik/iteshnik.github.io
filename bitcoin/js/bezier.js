
var w = 220,
    h = 400,
    t = 1,
    delta = .01,
    padding = 10,
    bezier = {},
    n = 3,
    stroke = d3.scale.category10(),
		line = d3.svg.line().x(x).y(y),
    orders = d3.range(2, n + 2);

var points = [
  {x: 0, y: 205},
  {x: 93, y: 263},
  {x: 139,y: 111},
  {x: 220, y: 171},
  {x: 0, y: 0}
];

var vis = d3.select("#vis").selectAll("svg")
    .data(orders)
  .enter().append("svg")
    .attr("width", w + 2 * padding)
    .attr("height", h + 2 * padding)
  .append("g")
    .attr("transform", "translate(" + padding + "," + padding + ")");

update();


    

var last = 0;
d3.timer(function(elapsed) {
  t = (t + (elapsed - last) / 5000) % 1;
  last = elapsed;
  update();
});

//update();
function update() {
  var interpolation = vis.selectAll("g")
    .data(function(d) { return getLevels(d, t); });
  interpolation.enter().append("g")
    .style("fill", colour);

  var circle = interpolation.selectAll("circle")
    .data(Object);
  circle.enter().append("circle")
    .attr("r", 4);
  circle
    .attr("cx", x)
    .attr("cy", y);

  var path = interpolation.selectAll("path")
    .data(function(d) { return [d]; });
  path.enter().append("path")
    .attr("class", "line")
    .attr("d", line);
  path.attr("d", line);

  var curve = vis.selectAll("path.curve")
    .data(getCurve);
  curve.enter().append("path")
    .attr("class", "curve");
  curve.attr("d", line);
}

function interpolate(d, p) {
  if (arguments.length < 2) p = t;
  var r = [];
  for (var i=1; i<d.length; i++) {
    var d0 = d[i-1], d1 = d[i];
    r.push({x: d0.x + (d1.x - d0.x) * p, y: d0.y + (d1.y - d0.y) * p});
  }
  return r;
}

function getLevels(d, t_) {
  if (arguments.length < 2) t_ = t;
  var x = [points.slice(0, d)];
  for (var i=1; i<d; i++) {
    x.push(interpolate(x[x.length-1], t_));
  }
  return x;
}

function getCurve(d) {
  var curve = bezier[d];
  if (!curve) {
    curve = bezier[d] = [];
    for (var t_=0; t_<=1; t_+=delta) {
      var x = getLevels(d, t_);
      curve.push(x[x.length-1][0]);
    }
  }
  return [curve.slice(0, t / delta + 1)];
}

function colour(d, i) {
  stroke(-i);
  return d.length > 1 ? "transparent" : "red";
}

function x(d) { return d.x; }
function y(d) { return d.y; }