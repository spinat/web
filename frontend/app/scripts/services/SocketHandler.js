'use strict';

angular.module('frontendApp')
  .factory('SocketHandler', function ($log, $rootScope, RegisterGroup) {
    $log.info('SocketHandler start');

    $rootScope.registerGroup = new RegisterGroup();

    var stompClient = null;

    var socket = new SockJS('http://localhost:8080/purchase'); // jshint ignore:line
    stompClient = Stomp.over(socket); // jshint ignore:line
    stompClient.connect({}, function(frame) {
      $log.info('Connected: ' + frame);

      stompClient.subscribe('/topic/purchase', function(purchase){
        $rootScope.$apply(function () {
          $rootScope.$broadcast('purchase', JSON.parse(purchase.body));
        });
      });

      stompClient.subscribe('/topic/addPerson', function(person){
        $rootScope.$apply(function () {
          $rootScope.registerGroup.addPerson(JSON.parse(person.body));
        });
      });

      stompClient.subscribe('/topic/deletePerson', function(person){
        $rootScope.$apply(function () {
          $rootScope.registerGroup.deletePerson(person.body);
        });
      });


      stompClient.subscribe('/topic/addItem', function(item){
        $rootScope.$apply(function () {
          $rootScope.registerGroup.addItem(JSON.parse(item.body));
        });
      });

      stompClient.subscribe('/topic/deleteItem', function(item){
        $rootScope.$apply(function () {
          $rootScope.registerGroup.deleteItem(JSON.parse(item.body));
        });
      });

    });



    return stompClient;
  });
