var myApp = angular.module('myApp',  ['ngResource']);

myApp.factory('getProperties', ['$resource', function($resource) {
	return $resource('/json/properties.json', {
	}, {
			'getData': { method: 'GET'}
	});
}]);

myApp.controller('ItemsController', [
	'$scope',
	'getProperties',
	'$http',
	 function(
		 $scope,
		 getProperties,
		 $http) {

getProperties.getData();

}]);