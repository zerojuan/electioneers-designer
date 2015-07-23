'use strict';

angular.module('paDesignerApp')
  .directive('populationGraph', function(){
    return {
      templateUrl: 'js/directives/PopulationGraph/populationGraph.html',
      restrict: 'E',
      scope: {
        population: '=',
        selected: '='
      },
      link: function(scope){
        var width = 960,
            height = 500;

        var color = d3.scale.category20();

        var force = d3.layout.force()
                  .charge(-120)
                  .linkDistance(200)
                  .size([width, height]);

        var svg = d3.select("svg")
                .attr("width", width)
                .attr("height", height);

        function arcPath(leftHand, d) {
            var start = leftHand ? d.source : d.target,
                end = leftHand ? d.target : d.source,
                dx = end.x - start.x,
                dy = end.y - start.y,
                dr = Math.sqrt(dx * dx + dy * dy),
                sweep = leftHand ? 0 : 1;
            return 'M' + start.x + ',' + start.y + 'A' + dr + ',' + dr + ' 0 0,' + sweep + ' ' + end.x + ',' + end.y;
        }
        scope.$watch('population', function(){
          if(scope.population && scope.population.length > 0){
            var nodes = angular.copy(scope.population);
            // console.log('')
            // force.nodes(nodes).start();
            _.forEach(nodes, function(n, i){
              n.count = i;
            });

            var node = svg.selectAll('.node')
                .data(nodes)
              .enter().append('g')
                .attr('transform', function(d){
                  var x = (d.count % 45 * 15) + 30;
                  var y = (d.count / 45 * 15) + 30;
                  return 'translate('+x+','+y+')';})
                .call(force.drag);
            node.append('circle')
              .attr('cx', 0)
              .attr('cy', 0)
              .attr('r', function(d){
                return 5;
              })
              .style('fill', '#ccc')
              .style('stroke-width', 1.5)
              .style('stroke', '#ccc');
              svg.append('svg:g').attr('class', 'labels');
              // force.on('tick', function() {
              //   // link.attr('x1', function(d) { return d.source.x; })
              //   //     .attr('y1', function(d) { return d.source.y; })
              //   //     .attr('x2', function(d) { return d.target.x; })
              //   //     .attr('y2', function(d) { return d.target.y; });
              //   linkPath.attr('d', function(d) {
              //     return arcPath(true, d);
              //   });
              //
              //   textPath.attr('d', function(d) {
              //     return arcPath(d.source.x < d.target.x, d);
              //   });
              //   // link.attr('d', function(d) {
              //   //     var dx = d.target.x - d.source.x,
              //   //         dy = d.target.y - d.source.y,
              //   //         dr = Math.sqrt(dx * dx + dy * dy);
              //   //     return 'M' +
              //   //         d.source.x + ',' +
              //   //         d.source.y + 'A' +
              //   //         dr + ',' + dr + ' 0 0,1 ' +
              //   //         d.target.x + ',' +
              //   //         d.target.y;
              //   // });
              //   link2.attr('d', function(d) {
              //     return arcPath(true, d);
              //   });
              //   // link2.attr('d', function(arcPa) {
              //   //     var dx = d.target.x - d.source.x,
              //   //         dy = d.target.y - d.source.y,
              //   //         dr = Math.sqrt(dx * dx + dy * dy);
              //   //     return 'M' +
              //   //         d.source.x + ',' +
              //   //         d.source.y + 'A' +
              //   //         dr + ',' + dr + ' 0 0,1 ' +
              //   //         d.target.x + ',' +
              //   //         d.target.y;
              //   // });
              //   node.attr('transform', function(d){return 'translate('+d.x+','+d.y+')';});
              // });
          }
        }, true);
      }
    }
  });
