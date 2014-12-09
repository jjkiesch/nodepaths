'use strict';

describe('Directive: newNode', function () {

  // load the directive's module
  beforeEach(module('nodepathsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<new-node></new-node>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the newNode directive');
  }));
});
