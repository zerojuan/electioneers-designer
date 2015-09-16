'use strict';

angular.module('paDesignerApp')
  .directive('geographicView', function() {
    return {
      templateUrl: 'js/directives/Geographic/geographicview.html',
      restrict: 'E',
      transclude: true,
      scope: {
        population: '=',
        districts: '=',
        selectedDistrict: '='
      },
      link: function(scope,elm) {
        var svg = d3.select(elm[0])
            .select('svg');
        var svgGroup = svg.append('g');
        var width = 960,
            height = 500;

        var force = d3.layout.force()
          .charge(-120)
          .gravity(0.02)
          .linkDistance(200)
          .size([width, height]);

        var zoom = function(){
          svgGroup.attr('transform', 'translate('+d3.event.translate+')scale('+d3.event.scale+')');
        };

        var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on('zoom', zoom);

        svg.call(zoomListener);

        var draggedNode = null;
        var dragStarted = false;

        var initDrag = function(d, nodeDom){

          dragStarted = false;
        };

        var dragListener = d3.behavior.drag()
          .on('dragstart', function(d){
            console.log('Drag Started', d);
            draggedNode = d;
            dragStarted = true;
            scope.selectedDistrict = d;
            scope.$apply();
            d3.event.sourceEvent.stopPropagation();
          })
          .on('drag', function(d){
            if(dragStarted){
              initDrag(d, this);
            }

            d.x += d3.event.dx;
            d.y += d3.event.dy;
            var node = d3.select(this);
            node.select('circle').classed('dragged', true);
            node.attr('transform', 'translate('+d.x+','+d.y+')');

            var lines = d3.selectAll('.link');
                lines.attr('x1', function(d) {return d.source.x; })
                  .attr('y1', function(d) { return d.source.y; })
                  .attr('x2', function(d) { return d.target.x; })
                  .attr('y2', function(d) { return d.target.y; });
          })
          .on('dragend', function(d){
            console.log('Drag Ended')
            var node = d3.select(this).select('circle');
            node.classed('dragged', false);
          });

        var renderGeomap = function(){
          var nodes,
              links = [];

          console.log(scope.districts);
          nodes = scope.districts;

          //create links
          _.forEach(nodes, function(node, i){
            node.x = 0;
            node.y = 0;
            var neighbors = node.neighbors;
            console.log(neighbors);
            _.forEach(neighbors, function(neighbor){
              var nid = _.find(nodes, function(n){
                if(n.id === neighbor.id){
                  return n;
                }
              });
              var link = {
                source: node,
                target: nid,
                value: 3
              };
              links.push(link);
            });
          });

          var link = svgGroup.selectAll('.link')
              .data(links)
            .enter().append('line')
              .attr('class', 'link')
              .style('stroke-width', function(d){
                return d.value;
              });

          var node = svgGroup.selectAll('.node')
              .data(nodes)
            .enter().append('g')
              .attr('transform', function(d){
                return 'translate('+0+','+0+')';
              })
              .call(dragListener);

            node.append('circle')
              .attr('class', 'node')
              .attr('cx', 0)
              .attr('cy', 0)
              .attr('r', 30);
            node.append('text')
              .attr('class', 'districtLabel')
              .style('fill', 'red')
              .text(function(d){
                return d.name;
              });
        };

        scope.$watch('districts', function(){
          renderGeomap();
        })
      }
    };
  });
