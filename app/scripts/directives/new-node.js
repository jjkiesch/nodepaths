'use strict';

/**
 * @ngdoc directive
 * @name nodepathsApp.directive:newNode
 * @description
 * # newNode
 */
angular.module('nodepathsApp')
  .directive('newNode', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        jsPlumb.draggable(element);
        element.draggable({
          revert: true
        });
      }
    };
  });
