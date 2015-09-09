'use strict';

angular.module('paDesignerApp')
  .directive('geographicView', function() {
    return {
      templateUrl: 'js/directives/Geographic/geographicview.html',
      restrict: 'E',
      transclude: true,
      scope: {
        population: '=',
        districts: '='
      },
      link: function(scope,elm) {
        var svg = d3.select(elm[0])
            .select('svg');
        var width = 960,
            height = 500;

        var force = d3.layout.force()
          .charge(-120)
          .linkDistance(30)
          .size([width, height]);

        var renderGeomap = function(){
          var nodes,
              links = [];

          console.log(scope.districts);
          nodes = scope.districts;

          //create links
          _.forEach(nodes, function(node, i){
            var neighbors = node.neighbors;
            console.log(neighbors);
            _.forEach(neighbors, function(neighbor){
              var nid = _.findIndex(nodes, function(n){
                return n.id === neighbor.id;
              });
              var link = {
                source: i,
                target: nid,
                value: 1
              };
              links.push(link);
            });
          });

          force
            .nodes(nodes)
            .links(links)
            .start();

          var link = svg.selectAll('.link')
              .data(links)
            .enter().append('line')
              .attr('class', 'link')
              .style('stroke-width', function(d){
                return d.value;
              });

          var node = svg.selectAll('.node')
              .data(nodes)
            .enter().append('circle')
              .attr('class', 'node')
              .attr('r', 5)
              .call(force.drag);

          force.on('tick', function(){
            link.attr('x1', function(d) { return d.source.x; })
                .attr('y1', function(d) { return d.source.y; })
                .attr('x2', function(d) { return d.target.x; })
                .attr('y2', function(d) { return d.target.y; });

            node.attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; });
          });
        };

        scope.$watch('districts', function(){
          renderGeomap();
        })
      }
    };
  });
