'use strict';

angular.module('frontendApp').factory('Person', function($log, _) {

  var Person = function(name, uuid) {
    this.name = name;
    this.uuid = uuid;
    this.articles = [];
  };

  Person.prototype.addArticle = function(Article) {
    var self = this;
    self.articles.push(Article);
    $log.info('Article added.', Article);
  };

  Person.prototype.getName = function() {
    var self = this;
    return self.name;
  };

  Person.prototype.getArticles = function() {
    var self = this;
    return self.articles;
  };

  Person.prototype.totalSum = function() {
    var self = this;

    return _.reduce(self.getArticles(), function(memo, article) { return memo + article.price; }, 0);
  };

  return Person;
});
