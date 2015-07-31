'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', function ($scope, $log, PurchaseService) {

    $log.info('MainCtrl start');
    var stompClient = null;
    function connect() {
      $log.info('Verbindung wird herstellt');

      var socket = new SockJS('http://localhost:8080/purchase'); // jshint ignore:line
      stompClient = Stomp.over(socket); // jshint ignore:line
      stompClient.connect({}, function(frame) {
        $log.info('Connected: ' + frame);

        stompClient.subscribe('/topic/purchase', function(purchase){
          $scope.$apply(function () {
            $scope.purchase = JSON.parse(purchase.body);
          });
        });

      });
    }
    connect();

    $scope.purchase = [];

    PurchaseService.getPurchase().then(
      function(purchase) {
        $log.info(purchase);
        $scope.purchase = purchase;
      }
    );

    $scope.addPerson = function(personName) {
      $log.info('Add person');
      stompClient.send('/app/addPerson', {}, JSON.stringify({ 'name': personName }));
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

    $scope.editItem = function(personName, uuid, itemName, price) {
      var message = JSON.stringify({ 'name': itemName, 'price': price, 'uuid': uuid });
      $log.info('Edit Item:', message);
      stompClient.send('/app/' + personName + '/buy', {}, message);
    };
  });
