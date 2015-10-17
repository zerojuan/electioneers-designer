'use strict';

angular.module('paDesignerApp')
  .service('GeographyHelper', function(){

    this.showFamilyName = function(element){
      if(!element.select('.familyLabel')[0][0]){
        element.append('text')
          .attr('class', 'familyLabel')
          .style('fill', 'red')
          .attr('x', 30)
          .text(function(d){
            return d.fatherName + ' ' + d.familyName;
          });
      }
    };

    this.hideFamilyName = function(element){
      element.select('.familyLabel').remove();
    };
  });
