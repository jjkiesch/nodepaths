'use strict';

/**
 * @ngdoc directive
 * @name nodepathsApp.directive:rootNode
 * @description
 * # rootNode
 */
angular.module('nodepathsApp')
  .directive('rootNode', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        jsPlumb.addEndpoints(element, [{ isSource: true, anchor: 'BottomLeft' }, { isSource: true, anchor: 'BottomRight' }]);
        element.text(scope.paths.value);
      }
    };
  });
