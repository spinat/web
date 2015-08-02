'use strict';

angular.module('frontendApp')
  .factory('PurchaseService', function ($log, $http, $q) {

    var service = {};

    service.getPurchase = function() {
      $log.info('get all Purchase');

      var deferred = $q.defer();
      $http.get('http://localhost:8080/api/listPurchase')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    service.save = function() {
      $log.info('get all Purchase');

      var deferred = $q.defer();
      $http.get('http://localhost:8080/api/save')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    return service;
  });
