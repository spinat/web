'use strict';

angular.module('frontendApp')
  .factory('SocketHandler', function ($log, $rootScope) {
    $log.info('SocketHandler start');

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
    });



    return stompClient;
  });
