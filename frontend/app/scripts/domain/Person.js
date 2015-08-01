'use strict';

angular.module('frontendApp').factory('Person', function($log, _) {

  var Person = function(name, uuid) {
    this.name = name;
    this.uuid = uuid;
    this.items = [];
  };

  Person.prototype.addItem = function(item) {
    var self = this;
    self.items.push(item);
  };

  Person.prototype.getName = function() {
    var self = this;
    return self.name;
  };

  Person.prototype.getItems = function() {
    var self = this;
    return self.items;
  };

  Person.prototype.totalSum = function() {
    var self = this;

    return _.reduce(self.getItems(), function(memo, item) { return memo + item.price; }, 0);
  };

  return Person;
});
