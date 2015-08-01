'use strict';

angular.module('frontendApp').factory('Person', function($log, _) {

  var Person = function(name) {
    this.name = name;
    this.articles = [];
  };

  Person.prototype.addArticle = function(Article) {
    var self = this;
    self.articles.push(Article);
    $log.info('Article added.', Article);
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
