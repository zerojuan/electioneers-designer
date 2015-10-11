'use strict';

/**
* Directive to make this element non-scrollable
*/
angular.module('paDesignerApp')
  .directive('affix', function(){
    return {
      restrict: 'A',
      link: function(scope, elm, attrs){
        var isFixed = false;
        var offset = $(elm).offset().top;
        $(document).on('scroll', function(e){
          // console.log(this);

          if(!isFixed){
            offset = $(elm).offset().top;
          }
          var scrollTop = $(window).scrollTop();
          if (scrollTop > offset) {
            isFixed = true;
            elm.addClass('affix');
          }else{
            elm.removeClass('affix');
          }
        });
      }
    };
  });
