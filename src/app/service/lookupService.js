'use strict';
(function() {

  var app = angular.module('lookupModule',['angular-json-rpc']);

  app.service('LookUpService', ['$http', function ($http) {

    var serviceURL = '/lookupService';

    this.getProjects = function (projectName) {
      projectName = '*' + projectName + '*';
      return  $http.jsonrpc(serviceURL, 'getProjectsByName', [projectName]);
    };

    this.getAffliations = function (affliationName) {
      affliationName = '*' + affliationName + '*';
      return  $http.jsonrpc(serviceURL, 'getAffliationsByName', [affliationName]);
    };

  }]);

}());
