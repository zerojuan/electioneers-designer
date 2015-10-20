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
        var svgGroup = svg.append('g').attr('class', 'mainGroup');

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
            GeographyHelper.updateDistrictConnection();
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

          //foreach children, show their family in that district
          function showChild(child){
            if(!child){
              return;
            }
            console.log('Showing child...', child);
            if(child.district.id !== family.district.id){
              console.log('rendering family...');
              var district = PopulationDB.findDistrictById(child.district.id, scope.districts);
              console.log('From district', district.id);
              if(!district.families){
                district.families = PopulationDB.getAllInDistrict(scope.population, child.district.id);
              }
              renderFamilies(show, district, child);

              //show line between this and their family
              GeographyHelper.showConnection(show, family, child);
            }else{
              GeographyHelper.showConnection(show, family, child);
            }
          }
          _.forEach(family.sons, showChild);
          _.forEach(family.daughters, showChild);

          //foreach parent show their family in that district
          showChild(family.father);
          showChild(family.mother);
        };

        /**
        * Show/hide families around a district
        * show: boolean, false to hide families
        * district: District to apply to
        * family: if present, set this specific family as selected
        */
        var renderFamilies = function(show, district, family){
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
            .attr('id', function(d){
              return 'family'+d._id;
            })
            .attr('class', 'family');

          familyG
            .transition()
            .attr('transform', function(d, i){
              var x = (radius+(d.voters * 5)) * Math.sin(i);
              var y = (radius+(d.voters * 5)) * Math.cos(i);
              d.x = x;
              d.y = y;
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

          if(family){
            var selectedF = d3.select('#family'+family._id);
            GeographyHelper.showFamilyName(selectedF);
          }
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
              });

          GeographyHelper.updateDistrictConnection();

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
            scope.selectedFamily = null;
            var inDistrict = PopulationDB.getAllInDistrict(scope.population, scope.selectedDistrict.id);
            console.log(inDistrict);
            scope.selectedDistrict.size = inDistrict.length;
            scope.selectedDistrict.families = inDistrict;

            console.log('Old Val: ', oldVal.name);
            console.log('New Val: ', newVal.name);
            //TODO: BUG: selecting an open district twice doesn't show the second time
            renderFamilies(false, oldVal);
            renderFamilies(true, newVal);
          }
        });

        scope.$watch('selectedFamily', function(newVal, oldVal){
          if(newVal){
            console.log('Selected Family is this: ', scope.selectedFamily);
            //render connections
            GeographyHelper.hideConnection();
            renderConnectedFamilies(false, oldVal);
            renderConnectedFamilies(true, newVal);
          }else if(oldVal){
            GeographyHelper.hideConnection();
            renderConnectedFamilies(false, oldVal);
          }
        });
      }
    };
  });
