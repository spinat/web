'use strict';

angular.module('frontendApp').factory('Item', function() {

  var Item = function(uuid, name, price) {
    this.uuid = uuid;
    this.name = name;
    this.price = price;
  };

  return Item;
});
