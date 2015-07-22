'use strict';
(function() {

    var app = angular.module('ProfileModule', ['angular-json-rpc']);

    app.service('ProfileService', ['$http', function($http) {
      var serviceURL = '/profileService';

        this.getProfiles = function(projectId) {
            return $http.jsonrpc(serviceURL, 'getProfile', [projectId]);
        };

        this.saveProfile = function(profiles) {
            $http.jsonrpc(serviceURL, 'saveProfile', [profiles])
                .success(function(data, status, headers, config) {
                    //update notifier
                }).error(function(data, status, headers, config) {
                    //error notifier
                });
        };

    }]);
}());
