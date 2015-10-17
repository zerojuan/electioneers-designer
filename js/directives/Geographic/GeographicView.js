'use strict';

angular.module('paDesignerApp')
  .directive('geographicView', function(PopulationDB, GeographyHelper) {
    return {
      templateUrl: 'js/directives/Geographic/geographicview.html',
      restrict: 'E',
      transclude: true,
      scope: {
        population: '=',
        districts: '=',
        selectedDistrict: '=',
        selectedFamily: '='
      },
      link: function(scope,elm) {
        var svg = d3.select(elm[0])
            .select('svg');
        var svgGroup = svg.append('g');

        var zoom = function(){
          svgGroup.attr('transform', 'translate('+d3.event.translate+')scale('+d3.event.scale+')');
        };

        var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on('zoom', zoom);

        svg.call(zoomListener).on('dblclick.zoom', null);

        var draggedNode = null;
        var dragStarted = false;

        var centerNode = function(source) {
          console.log('Centering to Source: ', source);
          var viewerWidth = $(document).width();
          var viewerHeight = $(document).height();
          var scale = source ? 1.5 : zoomListener.scale();
          var x = source ? -source.x : 0;
          var y = source ? -source.y : 0;

          //Zoom to center
          x = x * scale + viewerWidth / 2;
          y = y * scale + viewerHeight / 2;
          console.log('This is the scale',scale);
          svgGroup.transition()
              .duration(500)
              .attr('transform', 'translate(' + x + ',' + y + ')scale(' + scale + ')');
          zoomListener.scale(scale);
          zoomListener.translate([x, y]);
        };

        var doubleClick = function(d){
          console.log('Centering...');
          if (d3.event.defaultPrevented) {
            return; // click suppressed
          }

          centerNode(d);
        };

        var click = function(d){
          scope.selectedDistrict = d;
          scope.$apply();
        };

        var initDrag = function(){
          dragStarted = false;
          //TODO: notify world that it initialized dragging
        };

        var dragListener = d3.behavior.drag()
          .on('dragstart', function(d){
            console.log('Drag Started', d);
            draggedNode = d;
            dragStarted = true;
            d3.event.sourceEvent.stopPropagation();
          })
          .on('drag', function(d){
            if(dragStarted){
              initDrag(d, this);
            }

            //update node being dragged
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            var node = d3.select(this);
            node.select('.node').classed('dragged', true);
            node.attr('transform', 'translate('+d.x+','+d.y+')');

            //update lines
            var lines = d3.selectAll('.link');
                lines.attr('x1', function(d) {return d.source.x; })
                  .attr('y1', function(d) { return d.source.y; })
                  .attr('x2', function(d) { return d.target.x; })
                  .attr('y2', function(d) { return d.target.y; });
          })
          .on('dragend', function(d){
            console.log('Drag End: ', d);
            var node = d3.select(this).select('.node');
            node.classed('dragged', false);
          });

        var renderConnectedFamilies = function(show, family){
          if(!family){
            return;
          }

          PopulationDB.loadChildren(family, scope.population);
          PopulationDB.loadParents(family, scope.population);
          console.log('Family:', family);
        };

        /**
        * Show/hide families around a district
        * show: boolean, false to hide families
        * district: District to apply to
        */
        var renderFamilies = function(show, district){
          if(!district){
            return;
          }
          var id = district.id;

          var arr = show ? district.families : [];

          var families= svgGroup.select('#district'+id+' g')
            .selectAll('.family')
            .data(arr);

          //set radius according to size of district
          var radius = district.populationCount * 0.3;
          var familyG = families
            .enter()
            .append('g')
            .attr('class', 'family');

          familyG
            .transition()
            .attr('transform', function(d, i){
              var x = (radius+(d.voters * 5)) * Math.sin(i);
              var y = (radius+(d.voters * 5)) * Math.cos(i);
              return 'translate('+x+','+y+')';
            });

          familyG.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', function(d){
              return d.voters;
            });

          familyG.on('mouseover', function(d){
              //TODO: show family tooltip
              var el = d3.select(this);
              el.classed('hover', true);
              GeographyHelper.showFamilyName(el);
            })
            .on('mouseout', function(d){
              //TODO: hide family tooltip
              var el = d3.select(this);
              el.classed('hover', false);
              GeographyHelper.hideFamilyName(el);
            })
            .on('click', function(d){
              console.log('Clicked on family...', d);
              //TODO: select a family
              scope.selectedFamily = d;
              scope.$apply();
            });

          families
            .exit()
            .transition()
            .attr('transform', 'translate(0,0)')
            .remove();
        };

        var renderGeomap = function(){
          var nodes,
              links = [];

          nodes = scope.districts;


          //create links
          _.forEach(nodes, function(node, i){
            //count population size
            node.populationCount = PopulationDB.countPopulationInDistrict(scope.population, node.id);

            node.x = 300 * Math.sin(i);
            node.y = 300 * Math.cos(i);
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

          svgGroup.selectAll('.link')
              .data(links)
            .enter().append('line')
              .attr('class', 'link')
              .style('stroke-width', function(d){
                return d.value;
              })
              .attr('x1', function(d) {return d.source.x; })
              .attr('y1', function(d) { return d.source.y; })
              .attr('x2', function(d) { return d.target.x; })
              .attr('y2', function(d) { return d.target.y; });

          var node = svgGroup.selectAll('.node')
              .data(nodes)
            .enter().append('g')
              .attr('id', function(d){
                return 'district'+d.id;
              })
              .attr('transform', function(d){
                return 'translate('+d.x+','+d.y+')';
              })
              .on('dblclick', doubleClick)
              .on('click', click)
              .call(dragListener);

            node.append('circle')
              .attr('class', 'node')
              .attr('cx', 0)
              .attr('cy', 0)
              .attr('r', function(d){
                return d.populationCount * 0.3;
              });
            node.append('text')
              .attr('class', 'districtLabel')
              .style('fill', 'red')
              .attr('text-anchor', 'middle')
              .text(function(d){
                return d.name;
              });
            node.append('g');

          centerNode();
        };

        scope.$watch('districts', function(){
          renderGeomap();
        });

        scope.$watch('selectedDistrict', function(newVal, oldVal){
          if(scope.selectedDistrict){
            //find how many people are in this district

            var inDistrict = PopulationDB.getAllInDistrict(scope.population, scope.selectedDistrict.id);
            console.log(inDistrict);
            scope.selectedDistrict.size = inDistrict.length;
            scope.selectedDistrict.families = inDistrict;

            renderFamilies(false, oldVal);
            renderFamilies(true, newVal);
          }
        });

        scope.$watch('selectedFamily', function(newVal, oldVal){
          if(scope.selectedFamily){
            console.log('Selected Family is this: ', scope.selectedFamily);
            //render connections
            renderConnectedFamilies(false, oldVal);
            renderConnectedFamilies(true, newVal);
          }
        });
      }
    };
  });
