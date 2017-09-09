var myApp = angular.module('myApp',  ['ngResource','ui.router']);

myApp.config(function($stateProvider,$urlRouterProvider){
	$stateProvider.state('immobilien', {
		url: '/immobilien',
		templateUrl: 'index.html',
		controller: 'ItemsController',
		resolve: {

		}
	});
	$urlRouterProvider.when('', '/immobilien');
});

myApp.controller('ItemsController', [
	'$scope',
	'getProperties',
	'$http',
	 function(
		 $scope,
		 getProperties,
		 $http) {

		  $scope.propertiesArr = getProperties.getData({}, function (response) {
					console.log(response);
			}, function(rejection) {
				  console.log(rejection);
			});

}]);

// custom angular factories
myApp.factory('getProperties', ['$resource', function($resource) {
	return $resource('/json/properties.json', {
	}, {
			'getData': { method: 'GET'}
	});
}]);

// custom angular filters
myApp.filter('setItemImage', function($filter) {
	return function(itemUrl) {
		return !itemUrl ? "" : itemUrl ;
	}
});