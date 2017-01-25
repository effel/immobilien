var myApp = angular.module('myApp',['duScroll']);

function createShowProductsArray(products){
	var array = [];
	angular.forEach(products, function(value, key) {
	  this.push(false);
	}, array);	
	return array;
};

function checkForClassSet(prop) {
	if (!prop) {
	  prop = true;
	} else {
	  prop = false;	
	}	
	return prop;
};

myApp.controller('FilterController', ['$scope','$document','$http', function($scope,$document,$http) {

  $http({
    method: 'GET',
    url: '/json/man.json'
    }).then(function successCallback(response) {
      $scope.productsMans = response.data;
	  $scope.shouldProductBeShown = createShowProductsArray($scope.productsMans);
    }, function errorCallback(response) {
      console.log(response);
    });
	
  $http({
    method: 'GET',
    url: '/json/woman.json'
    }).then(function successCallback(response) {
      $scope.productsWomans = response.data;
	  $scope.shouldProductBeShown = createShowProductsArray($scope.productsWomans);
    }, function errorCallback(response) {
      console.log(response);
    });	

  $http({
    method: 'GET',
    url: '/json/kids.json'
    }).then(function successCallback(response) {
      $scope.productsKids = response.data;
	  $scope.shouldProductBeShown = createShowProductsArray($scope.productsKids);
    }, function errorCallback(response) {
      console.log(response);
    });	
	
	
	$scope.products = [];
	
	$scope.scrollToProducts = function() {
      var productsId = angular.element(document.getElementById('productsItems'));
      $document.scrollToElementAnimated(productsId);
	};
	
	$scope.activeMenu = false;
	$scope.showNavMenu = function($index) {
      $scope.activeMenu = checkForClassSet($scope.activeMenu);
	};
	
	$scope.setItemState = function ($index,$event) {
		$scope.shouldProductBeShown[$index] = checkForClassSet($scope.shouldProductBeShown[$index]);
		var checkArray = []
	    angular.forEach($scope.shouldProductBeShown, function(value, key){
		  if (value===true) {
			 checkArray.push(true);
		  }
	    });	

		if (checkArray.length !== 0) {
		  $scope.activeCard = true;
		} else {
		  $scope.activeCard = false;		
		}	
	};
	
	$scope.showCurrentItems = function(val, modelName) {
		function checkIsChecked(valArray) {
		   if (modelName) {
			 $scope.products = valArray;
		   } else {
			  $scope.products = [];
		   }			
		}
		switch(val) {
			case "Man":
				$scope.checkedWoman = false;
				$scope.checkedKids = false;				
			    checkIsChecked($scope.productsMans);
				break;
			case "Woman":
			    checkIsChecked($scope.productsWomans);
				$scope.checkedMan = false;
				$scope.checkedKids = false;					
				break;
			case "Kids":
			    checkIsChecked($scope.productsKids);
				$scope.checkedMan = false;
				$scope.checkedWoman = false;					
				break;				
			default:
				$scope.products = [];
		} 		
	};
	
	$scope.showAllProducts = function() {
	   $scope.products = $scope.productsMans.concat($scope.productsWomans,$scope.productsKids);		
	   $scope.checkedMan = false;
	   $scope.checkedWoman = false;
	   $scope.checkedKids = false;		   
	};	

}]).value('duScrollOffset', 120);