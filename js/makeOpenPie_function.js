var width = 300;
var arcSize = (6 * width / 100);
var innerRadius = arcSize * 3;            

                var data = [
                    {value: 45, label: "label_1", color: '#ff0000'},
                    {value: 33, label: "label_2", color: '#00ff00'},
                    {value: 66, label: "label_3", color: '#0000ff'},
                    {value: 50, label: "label_4", color: '#ffff00'},
                    {value: 90, label: "label_5", color: '#ff0099'}
                ]; 

  
function render_open_pie({data=data,
                          htmlID=null,
                          width_val=300,
                          height_val = 300}) {
                    
                    var arcSize = (6 * width_val / 100);
                    var innerRadius = arcSize * 3;

                    var svg = d3.select('#'+htmlID).append('svg').attr('width', width).attr('height', width);

                    var arcs = data.map(function (obj, i) {
                        return d3.svg.arc().innerRadius(i * arcSize + innerRadius).outerRadius((i + 1) * arcSize - (width / 100) + innerRadius);
                    });
                    var arcsGrey = data.map(function (obj, i) {
                        return d3.svg.arc().innerRadius(i * arcSize + (innerRadius + ((arcSize / 2) - 2))).outerRadius((i + 1) * arcSize - ((arcSize / 2)) + (innerRadius));
                    });

                    var pieData = data.map(function (obj, i) {
                        return [
                            {value: obj.value * 0.75, arc: arcs[i], object: obj},
                            {value: (100 - obj.value) * 0.75, arc: arcsGrey[i], object: obj},
                            {value: 100 * 0.25, arc: arcs[i], object: obj}];
                    });

                    var pie = d3.layout.pie().sort(null).value(function (d) {
                        return d.value;
                    });

                    var g = svg.selectAll('g').data(pieData).enter()
                        .append('g')
                        .attr('transform', 'translate(' + width / 2 + ',' + width / 2 + ') rotate(180)');
                    var gText = svg.selectAll('g.textClass').data([{}]).enter()
                        .append('g')
                        .classed('textClass', true)
                        .attr('transform', 'translate(' + width / 2 + ',' + width / 2 + ') rotate(180)');


                    g.selectAll('path').data(function (d) {
                        return pie(d);
                    }).enter().append('path')
                        .attr('id', function (d, i) {
                            if (i == 1) {
                                return "Text" + d.data.object.label
                            }
                        })
                        .attr('d', function (d) {
                            return d.data.arc(d);
                        }).attr('fill', function (d, i) {
                        return i == 0 ? d.data.object.color : i == 1 ? '#D3D3D3' : 'none';
                    });

                    svg.selectAll('g').each(function (d, index) {
                        var el = d3.select(this);
                        var path = el.selectAll('path').each(function (r, i) {
                            if (i === 1) {
                                var centroid = r.data.arc.centroid({
                                    startAngle: r.startAngle + 0.05,
                                    endAngle: r.startAngle + 0.001 + 0.05
                                });
                                var lableObj = r.data.object;
                                g.append('text')
                                    .attr('font-size', ((3.5 * width) / 100))
                                    .attr('dominant-baseline', 'central')
                                    /*.attr('transform', "translate(" + centroid[0] + "," + (centroid[1] + 10) + ") rotate(" + (180 / Math.PI * r.startAngle + 7) + ")")
                                     .attr('alignment-baseline', 'middle')*/
                                    .append("textPath")
                                    .attr("textLength", function (d, i) {
                                        return 0;
                                    })
                                    .attr("xlink:href", "#Text" + r.data.object.label)
                                    .attr("startOffset", '5')
                                    .attr("dy", '-3em')
                                    .text(lableObj.value + '%');
                            }
                            if (i === 0) {
                                var centroidText = r.data.arc.centroid({
                                    startAngle: r.startAngle,
                                    endAngle: r.startAngle
                                });
                                var lableObj = r.data.object;
                                gText.append('text')
                                    .attr('font-size', ((5 * width) / 100))
                                    .text(lableObj.label)
                                    .attr('transform', "translate(" + (centroidText[0] - ((1.5 * width) / 100)) + "," + (centroidText[1] + ") rotate(" + (180) + ")"))
                                    .attr('dominant-baseline', 'central');
                            }
                        });
                    });
                }

          
export{render_open_pie}