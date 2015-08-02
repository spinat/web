'use strict';

angular.module('frontendApp')
  .controller('MainCtrl', function ($scope, $log, Purchase, SocketHandler, $rootScope, PurchaseService) {

    $log.info('MainCtrl start', Purchase);


    $scope.purchase = $rootScope.registerGroup;
    $rootScope.registerGroup.import(Purchase);

    var stompClient = SocketHandler;

    $scope.save = function() {
      $log.info('Save');
      PurchaseService.save();
    };

    $scope.addPerson = function(personName) {
      SocketHandler.send('/app/addPerson', {}, personName);
      $scope.newPerson = '';
    };

    $scope.deletePerson = function(personName) {
      $log.info('Delete person');
      stompClient.send('/app/deletePerson', {}, personName);
    };

    $scope.addItem = function(personName) {
      $log.info('Add item');
      stompClient.send('/app/addItem', {}, personName);
    };

    $scope.deleteItem = function(uuid, personName) {
      $log.info('delete Item', uuid);
      stompClient.send('/app/deleteItem/' + uuid, {}, personName);
    };

    $scope.editItem = function(person, itemUuid, itemName, price) {
      var newItemName = itemName === null ? '?' : itemName;
      var newPrice = price === null ? -1 : price;

      stompClient.send('/app/' + person.name + '/editItem/' + itemUuid + '/' + newItemName + '/' + newPrice, {}, {});
    };
  });
