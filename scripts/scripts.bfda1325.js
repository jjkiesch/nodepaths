"use strict";angular.module("nodepathsApp",[]),angular.module("nodepathsApp").controller("MainCtrl",["$scope",function(a){a.nodesCount=0,a.nodes=[],a.greatestPath=100,a.paths={id:"root",value:a.greatestPath},a.addEndpoints=function(b){var c=angular.element("#"+b);jsPlumb.addEndpoint(c,{isTarget:!0,anchor:"Top"}),jsPlumb.addEndpoint(c,{isSource:!0,anchor:"BottomLeft"}),jsPlumb.addEndpoint(c,{isSource:!0,anchor:"BottomRight"}),a.nodesCount++,a.$apply()},jsPlumb.bind("connection",function(e){for(var f=e.sourceEndpoint.anchor.type,g=b(e.sourceId,a.paths),h=0;h<a.nodes.length;h++)if(a.nodes[h].id===e.targetId){var i={id:a.nodes[h].id,value:a.nodes[h].value};"BottomLeft"===f?g.leftNode=i:g.rightNode=i}a.greatestPath=d(c(a.paths)),a.$apply()});var b=function(a,c){var d=null;for(var e in c){if(c.id===a)return c;if(c[e]instanceof Object&&(d=b(a,c[e])))return d}return d},c=function(a){if(!a.leftNode&&!a.rightNode)return[a];var b=[];a.leftNode&&(b=c(a.leftNode));var e=[];return a.rightNode&&(e=c(a.rightNode)),d(e)>d(b)?(e.push(a),e):(b.push(a),b)},d=function(a){for(var b=0,c=0;c<a.length;c++)b+=a[c].value;return b}}]),angular.module("nodepathsApp").directive("rootNode",function(){return{restrict:"A",link:function(a,b){b.text(a.paths.value),jsPlumb.addEndpoints(b,[{isSource:!0,anchor:"BottomLeft"},{isSource:!0,anchor:"BottomRight"}])}}}),angular.module("nodepathsApp").directive("newNode",function(){return{restrict:"A",link:function(a,b){jsPlumb.draggable(b),b.draggable({revert:!0})}}}),angular.module("nodepathsApp").directive("subNode",function(){return{restrict:"A",link:function(a,b,c){for(var d=0;d<a.nodes.length;d++)a.nodes[d].id===c.id&&b.text(a.nodes[d].value);jsPlumb.draggable(b)}}}),angular.module("nodepathsApp").directive("nodeContainer",function(){return{restrict:"A",link:function(a,b){b.droppable({drop:function(c,d){var e=b.offset(),f=angular.element(d.draggable);if(f.hasClass("add")){var g="node-"+a.nodesCount;a.nodes.push({value:Math.floor(1e3*Math.random()),x:c.pageX-e.left,y:c.pageY-e.top,id:g}),a.$apply(),a.addEndpoints(g)}}})}}});