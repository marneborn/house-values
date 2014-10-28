var myApp = angular
.module('myApp', [])
.controller('testCtrl', function ($scope, $http) {
    $scope.foo = "bar";
    $http
    .get("http://www.zillow.com/webservice/GetDeepComps.htm?zws-id=X1-ZWz1b29aw4bf2j_56tmg&zpid=48749425&count=5")
    .success(
        function (data, status) {
            $scope.foo = data;
            console.log("s> "+status);
        }
    )
    .error(
        function (data, status) {
            console.log("e> "+status+' - '+data);
        }
    );

});

//19520882
//http://www.zillow.com/homes/recently_sold/zest_sort/37.386407,-122.029674,37.368878,-122.056797_rect/14_zm/7fcc85446bX1-CR15qm5m882jd0t_124d5t_crid/
