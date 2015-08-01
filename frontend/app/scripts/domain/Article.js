'use strict';

angular.module('frontendApp').factory('Article', function() {

  var Article = function(name, price) {
    this.name = name;
    this.price = price;
  };

  return Article;
});
