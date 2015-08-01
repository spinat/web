'use strict';

angular.module('frontendApp').factory('RegisterGroup', function($log, _) {

  var RegisterGroup = function() {
    this.persons = [];
  };


  RegisterGroup.prototype.addPerson = function(person) {
    $log.info('Add person to party', person);
    var self = this;

    self.persons.push(person);
  };

  RegisterGroup.prototype.deletePerson = function(personName) {
    var self = this;

    var index = _.findIndex(self.persons, function(person) {
      return person.name === personName;
    });

    self.persons.splice(index, 1);

    $log.info('Delete person from party', personName, self.persons);
  };


  RegisterGroup.prototype.getPersons = function() {
    var self = this;
    return self.persons;
  };

  RegisterGroup.prototype.sumPrices = function() {
    var self = this;

    //Weil wir funktionale Programmmierung lerenen möchten
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

  return RegisterGroup;
});
