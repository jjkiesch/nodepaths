'use strict';

/**
 * @ngdoc function
 * @name nodepathsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nodepathsApp
 */
angular.module('nodepathsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.nodesCount = 0;
    $scope.nodes = [];
    $scope.greatestPath = 100;
    $scope.paths = {
      id: 'root',
      value: $scope.greatestPath
    };

    $scope.addEndpoints = function(elId) {
      var newNode = angular.element('#' + elId);
      jsPlumb.addEndpoint(newNode, { isTarget: true, anchor: 'Top' });
      jsPlumb.addEndpoint(newNode, { isSource: true, anchor: 'BottomLeft'});
      jsPlumb.addEndpoint(newNode, { isSource: true, anchor: 'BottomRight'});
      $scope.nodesCount++;
      $scope.$apply();
    };

    jsPlumb.bind('connection', function(info) {
      var side = info.sourceEndpoint.anchor.type;
      var source = findParentNode(info.sourceId, $scope.paths);
      for (var i = 0; i < $scope.nodes.length; i++) {
        if ($scope.nodes[i].id === info.targetId) {
          var newNode = {
            id: $scope.nodes[i].id,
            value: $scope.nodes[i].value
          };
          if (side === 'BottomLeft') {
            source.leftNode = newNode;
          } else {
            source.rightNode = newNode;
          }
        }
      }
      $scope.greatestPath = sumValues(findGreatestPath($scope.paths));
      $scope.$apply();
    });

    var findParentNode = function(key, paths) {
      var result = null;
      for (var id in paths) {
        if (paths.id === key) {
          return paths;
        }
        if (paths[id] instanceof Object) {
          result = findParentNode(key, paths[id]);
          if (result) {
            return result;
          }
        }
      }
      return result;
    };

    var findGreatestPath = function(current) {
      if (!current.leftNode && !current.rightNode) {
        return [current];
      }

      var leftBest = [];
      if (current.leftNode) {
        leftBest = findGreatestPath(current.leftNode);
      }

      var rightBest = [];
      if (current.rightNode) {
        rightBest = findGreatestPath(current.rightNode);
      }

      if (sumValues(rightBest) > sumValues(leftBest)) {
        rightBest.push(current);
        return rightBest;
      } else {
        leftBest.push(current);
        return leftBest;
      }
    };

    var sumValues = function(items) {
      var total = 0;
      for (var i = 0; i < items.length; i++) {
        total += items[i].value;
      }
      return total;
    };
  });
