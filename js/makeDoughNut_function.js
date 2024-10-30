function makeDoughNut({exportData=TOOLS,
    export_OBS=TOOLS,
    htmlID=null,
    lineColor="steelblue",
    lineWidth=1.5,
    width = 450,
    height = 450,
    margin = 70,
    spaceSides = 460,
    spaceTopBot = 460}){

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called '#htmlID'
var svg = d3.select("#" + htmlID)
.append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// set the color scale
var color = d3.scaleOrdinal()
//.domain(["a", "b", "c", "d", "e", "f", "g", "h"])
 .domain(Object.keys(exportData))
 .range([d3.interpolateViridis(0.2),
         d3.interpolateViridis(0.5),
         d3.interpolateViridis(0.8)]);

console.log(`colors: ${color}`);
// Compute the position of each group on the pie:
var pie = d3.pie()
.sort(null) // Do not sort group by size
.value(function(d) {return d.value; })

var tooltip = d3.select("#" + htmlID)
.append('div')
.attr('class', 'activeTOOL');

tooltip.append('div')
.attr('class', 'label')
.style('font-weight','bold');

tooltip.append('div')
.attr('class', 'count');

tooltip.append('div')
.attr('class', 'percent');

// The arc generator
var arc = d3.arc()
.innerRadius(radius * 0.7) // This is the size of the donut hole
.outerRadius(radius * 0.8)

// Another arc that won't be drawn. Just for labels positioning
var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9)

var data_ready = pie(d3.entries(exportData))

// Build the pie chart: Basically, each part of the pie is
// a path that we build using the arc function.
var path = svg.selectAll('allSlices')
 .data(data_ready)

var pathEnter = path.enter()
       .append('path')
       .attr('d', arc)
       .attr('fill', function(d){ return(color(d.data.key)) })
       .attr("stroke", "white")
       .style("stroke-width", "2px")
       .style("opacity", 0.7)

//this is the "update" selection:
var pathUpdate = path.attr("d", arc);

pathEnter.on('mouseover', function(d) {                            // NEW
var total = d3.sum(data_ready.map(function(d) {                // NEW
return d.value;                                           // NEW
}));                                                        // NEW
var percent = Math.round(1000 * d.data.value / total) / 10; // NEW
tooltip.select('.label').html(d.data.key);                // NEW
tooltip.select('.count').html(d.data.value.toLocaleString());                // NEW
tooltip.select('.percent').html(percent + '%');             // NEW
tooltip.style('display', 'block');                          // NEW
});                                                           // NEW

pathEnter.on('mouseout', function() {                              // NEW
tooltip.style('display', 'none');                           // NEW
});                                                           // NEW

// OPTIONAL
pathEnter.on('mousemove', function(d) {                            // NEW
//  tooltip.style('top', (d3.event.pageY - 10) + 'px')          // NEW
//         .style('left', (d3.event.pageX - 10) + 'px');
// tooltip.style("top", (d3.event.pageY - 100) + "px")
//       .style("left", (d3.event.pageX - 100) + "px");             // NEW
//tooltip.style("top", d3.select(this).attr("cy") + "px");
//tooltip.style("left", d3.select(this).attr("cx") + "px")
let pos = d3.select(this).node().getBoundingClientRect();
d3.select('#'+htmlID)
.style('left', `${pos['x']}px`)
.style('top', `${(window.pageYOffset  + pos['y'] - 100)}px`);
});                                                           // NEW

/* add text to center of the donut plot */
svg.append("text")
.attr("text-anchor", "middle")
.attr('font-size', '4em')
.attr('y', 20)
.text(export_OBS.totalObs.toLocaleString());

/* add text to center of the donut plot */
svg.append("text")
.attr("text-anchor", "middle")
.attr('font-size', '1em')
.attr('y', -40)
.text(`Observations:`);

/* add text to center of the donut plot */
/* svg.append("text")
.attr("x", 0)
.attr("y", -150)
.attr("text-anchor", "middle")
.style("font-size", "2em")
.text(`Observation breakdown`); */

// Add one dot in the legend for each name.
svg.selectAll("mydots")
.data(data_ready)
.enter()
.append("circle")
.attr("cx", -10)
.attr("cy", function(d,i){ return 50 + i*15}) // 100 is where the first dot appears. 25 is the distance between dots
.attr("r", 5)
.style("fill", function(d){ return color(d.data.key)})

// Add one dot in the legend for each name.
svg.selectAll("mylabels")
.data(data_ready)
.enter()
.append("text")
.attr("x", -5)
// 100 is where the first dot appears. 25 is the distance between dots
.attr("y", function(d,i){ return 55 + i*15})
.style("fill", function(d){ return color(d.data.key)})
.text(function(d){ return d.data.key})
.attr("text-anchor", "left")
.style("alignment-baseline", "middle")

}

// Export the function we wrote so that we can use it in other scripts 
export{makeDoughNut}; 