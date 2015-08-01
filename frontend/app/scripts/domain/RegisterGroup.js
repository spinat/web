'use strict';

angular.module('frontendApp').factory('RegisterGroup', function($log, _, Person) {

  var RegisterGroup = function() {
    this.persons = [];
  };

  RegisterGroup.prototype.import = function(purchase) {
    var persons = purchase[0];
    var items = purchase[1];
    $log.info('Import', purchase, persons, items);

    var self = this;

    //Add Persons
    _.chain(persons)
      .each(function(person) {
        var p = new Person(person.name, person.uuid);
        self.persons.push(p);
      });

    //Add Items
    _.chain(items)
      .flatten()
      .each(function(item) {
        var personName = item.person.name;
        var personIndex = self.findPersonIndexByName(personName);
        var person = self.getPersonByIndex(personIndex);

        person.addItem(item);

        $log.info('items:', item, personName);
      });
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

  RegisterGroup.prototype.deleteItem = function(item) {
    var personName = item[0];
    var itemUuid = item[1];

    var self = this;
    var personIndex = self.findPersonIndexByName(personName);
    var person = self.getPersonByIndex(personIndex);
    person.deleteItem(itemUuid);
  };

  RegisterGroup.prototype.editItem = function(item) {

    $log.info('item', item);

    var self = this;
    var personIndex = self.findPersonIndexByName(item.person.name);
    var person = self.getPersonByIndex(personIndex);

    var indexItem = person.findItemIndexByUuid(item.uuid);
    var foundItem = person.findItemByIndex(indexItem);

    foundItem.name = item.name;
    foundItem.price = item.price;
  };

  return RegisterGroup;
});
