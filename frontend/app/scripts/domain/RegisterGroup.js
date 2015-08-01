'use strict';

angular.module('frontendApp').factory('RegisterGroup', function($log, _, Person) {

  var RegisterGroup = function() {
    this.persons = [];
  };

  RegisterGroup.prototype.addPerson = function(person) {
    $log.info('Add person to party', person);
    var self = this;

    var p = new Person();
    p.name = person.name;
    p.uuid = person.uuid;
    p.items = [];

    self.persons.push(p);
  };

  RegisterGroup.prototype.findPersonIndexByName = function(personName) {
    var self = this;

    var index = _.findIndex(self.persons, function(person) {
      return person.name === personName;
    });

    return index;
  };

  RegisterGroup.prototype.deletePerson = function(personName) {
    var self = this;

    var index = self.findPersonIndexByName(personName);

    self.persons.splice(index, 1);

    $log.info('Delete person from party', personName, self.persons);
  };

  RegisterGroup.prototype.getPersons = function() {
    var self = this;
    return self.persons;
  };

  RegisterGroup.prototype.sumPrices = function() {
    var self = this;

    return _.chain(self.getPersons())
      .map(function(person) { return person.getArticles(); })
      .flatten()
      .reduce(function(memo, article) { return memo + article.price; }, 0)
      .value();
  };

  RegisterGroup.prototype.getPersonByIndex = function(index) {
    var self = this;
    return self.persons[index];
  };

  RegisterGroup.prototype.addItem = function(item) {
    var self = this;
    var index = self.findPersonIndexByName(item.person.name);
    var person = self.getPersonByIndex(index);
    person.addItem(item);
  };

  return RegisterGroup;
});
