'use strict';

/**
 * @ngdoc directive
 * @name nodepathsApp.directive:nodeContainer
 * @description
 * # nodeContainer
 */
angular.module('nodepathsApp')
  .directive('nodeContainer', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        element.droppable({
          drop: function(event, ui) {
            var parentOffset = element.offset();
            var dragEl = angular.element(ui.draggable);
            if (dragEl.hasClass('add')) {
              var elId = 'node-' + scope.nodesCount;
              scope.nodes.push({ value: Math.floor(Math.random()*1000), x: event.pageX - parentOffset.left, y: event.pageY - parentOffset.top, id: elId });
              scope.$apply();
              scope.addEndpoints(elId);
            }
          }
        });
      }
    };
  });
