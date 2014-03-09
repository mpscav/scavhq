ScavHQ.controller('NavCtrl', function($scope, $location) {
    $scope.navLinks = ['items', 'people', 'missions', 'contact'];

    $scope.navClass = function(page) {
        var currentRoute = $location.path().substring(1);
        return page == currentRoute ? 'active' : '';
    };
});

ScavHQ.controller('ItemsCtrl', function($scope, $http) {
    $http.get('api/items').success(function(data) {
        $scope.items = data;
    });
});

ScavHQ.controller('PeopleCtrl', function($scope) {
});

ScavHQ.controller('MissionsCtrl', function($scope) {
});

ScavHQ.controller('ContactCtrl', function($scope) {
});
