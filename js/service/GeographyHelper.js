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

    this.showConnection = function(fromData, toData){
      var frm = d3.select('#family'+fromData._id);
      var to = d3.select('#family'+toData._id);

      console.log('From: ', frm, 'To: ', to);

      frm.append('line')
        .attr('stroke', 'solid')
        .attr('x', function(){
          return frm.x;
        });
    }
  });
