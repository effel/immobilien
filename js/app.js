var myApp = angular.module('myApp',  ['ui.router','ngResource']);

myApp.config(function($stateProvider,$urlRouterProvider){
	$stateProvider.state('immobilien', {
		url: '/immobilien',
		templateUrl: 'index.html',
		controller: 'ItemsController'
	});
	$urlRouterProvider.when('', '/immobilien');
});

myApp.controller('ItemsController', [
	'$scope',
	'GetProperties',
	 function(
		 $scope,
		 GetProperties,
		) {

		$scope.propertiesArr = GetProperties.getData({}, function (response) {
			console.log(response);
		}, function(rejection) {
			console.log(rejection);
		});

		$scope.setVisibleByDay = function(item) {
			 const newDayCounter = 3;
			 var currentDate = Date.now();
			 var itemDate = new Date(item.meta.creation.date);
			 var checkinDate = new Date(currentDate - itemDate).getDay();

			 if (checkinDate > newDayCounter) {
				return false; 
			 } else {
				 return true;
			 }
   
		}
}]);

// custom angular factories
myApp.factory('GetProperties', ['$resource', function($resource) {
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