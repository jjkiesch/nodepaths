'use strict';

/**
 * @ngdoc directive
 * @name nodepathsApp.directive:subNode
 * @description
 * # subNode
 */
angular.module('nodepathsApp')
  .directive('subNode', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        // find the scope object for this element
        for (var i = 0; i < scope.nodes.length; i++) {
          if (scope.nodes[i].id === attrs.id) {
            element.text(scope.nodes[i].value);
          }
        }
        jsPlumb.draggable(element);
      }
    };
  });
