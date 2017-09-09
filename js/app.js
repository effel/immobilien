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

		var self = $scope;	
		$scope.contentLoad = false;
		$scope.propertiesArr = GetProperties.getData({}, function (response) {
			self.contentLoad = true;
		}, function(rejection) {
			self.contentLoad = true;			
			console.log(rejection);
		});

		$scope.setVisibleByDay = function(item) {
			 const newDayCounter = 3;
			 var currentDate = Date.now();
			 var itemDate = new Date(item.meta.creation.date);
			 var checkinDate = new Date(currentDate - itemDate).getDay();
             return   !(checkinDate > newDayCounter);
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
