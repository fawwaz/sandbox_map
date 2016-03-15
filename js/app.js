angular.module('SvgMapApp', [])
.filter('map_colour', [function () {
	return function (input) {
		var b = 255 - Math.floor(input * 255);
		var g = Math.floor(input * 255);
		return "rgba(255," + g + "," + b + ",1)";
	}
}])
.directive('svgMap',['$compile',function($compile){
	return {
		restrict: 'A',
		templateUrl: 'img/Blank_US_Map.svg',
		link: function (scope, element, attrs) {
			var regions = element[0].querySelectorAll('.state');
			angular.forEach(regions, function (path, key) {
				console.log("key"+key);
				console.log("path"+path);
				var regionElement = angular.element(path);
				regionElement.attr("region", "");
				regionElement.attr("dummy-data", "dummyData");
				regionElement.attr("hover-region", "hoverRegion"); //<--- Add this
				$compile(regionElement)(scope);
			});
		}
	}
}])
.directive('region', ['$compile', function ($compile) {
	return {
		restrict: 'A',
		scope: {
			dummyData: "=",
			hoverRegion: "=" //<--- Add this
		},
		link: function (scope, element, attrs) {
			scope.elementId = element.attr("id");
			scope.regionClick = function () {
				alert(scope.elementId + " " + scope.dummyData[scope.elementId].value);
			};
			scope.regionMouseOver = function () {//<
				scope.hoverRegion = scope.elementId;//<--- Add this
				element[0].parentNode.appendChild(element[0]);//<
			};
			element.attr("ng-click", "regionClick()");
			element.attr("ng-attr-fill", "{{dummyData[elementId].value | map_colour}}");
			element.attr("ng-mouseover", "regionMouseOver()"); //<--- Add this
			element.attr("ng-class", "{active:hoverRegion==elementId}"); //<--- Add this
			element.removeAttr("region");
			$compile(element)(scope);
		}
	}
}])
.controller('MainCtrl', ['$scope', function ($scope) {
	var states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL",
	"IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
	"NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA",
	"WA", "WV", "WI", "WY"];
	$scope.createDummyData = function () {
		var dataTemp = {};
		angular.forEach(states, function (state, key) {
			dataTemp[state] = {value: Math.random()}
		});
		$scope.dummyData = dataTemp;
	};
	$scope.createDummyData();
	$scope.changeHoverRegion = function (region) {  //
		$scope.hoverRegion = region;                // <-- Add this
	};
}]);