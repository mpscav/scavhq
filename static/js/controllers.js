ScavHQ.controller('ItemsCtrl', function($scope, $http) {
    $http.get('api/items').success(function(data) {
        $scope.items = data;
    });
});
