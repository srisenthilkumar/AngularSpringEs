'use strict';

angular.module('client')
.config(function ($stateProvider,$urlRouterProvider) {
  // For unmatched routes
  $urlRouterProvider.otherwise('/');
  // Application routes

  $stateProvider
    .state('index', {
      url: '/',
      views: {
        "leftView": {templateUrl: "app/miniprofile/miniprofile.html",controller: 'MiniProfileCtrl'}
        // "middleView": {templateUrl: "templates/scene_view.html"},
      //  "rightView": {templateUrl: "app/main/main.html"}
      }
    });
});
