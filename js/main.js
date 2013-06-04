$(document).ready(function(){

  var map = new L.Map('map').setView(new L.LatLng(38.85, -77), 7);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  $('.getData').click(function(e){
    e.preventDefault();
    var stat = ' Cover Crops  '; //spaces required bc of ugly data
    var geo = 'maryland';
    getSocrata(stat, geo);
  })

});

function getSocrata(stat, geo){
  $('#res').html('loading...');
  $.getJSON('api/bay/' + stat + '/' + geo, function(res){
    $('#res').html('<h4>Cover Crops (Maryland)</h4>');
    makeLineChart(res);
  });
}

function makeLineChart(data){
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%Y").parse;
  var chartData = [];
  var chartData2 = [];

  for(var i = 2000; i <= 2013; i++) {
    var year = "_" + i;
    chartData.push({
      date: parseDate(i.toString()),
      stat: +data[0][year].replace(",", "").replace("*", "")
    });
    chartData2.push({
      date: parseDate(i.toString()),
      stat: +data[0]["_2013_goal"].replace(",", "").replace("*", "")
    });
  }
  console.log(chartData2);

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.stat); });

  var svg = d3.select("#res").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  x.domain(d3.extent(chartData, function(d) { return d.date; }));
  y.domain(d3.extent(chartData, function(d) { return d.stat; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Cover Crops (acres)");

  svg.append("path")
      .datum(chartData)
      .attr("class", "line")
      .attr("d", line);

  svg.append("path")
      .datum(chartData2)
      .attr("class", "line secondary")
      .attr("d", line);

}