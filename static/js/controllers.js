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

    $scope.filtering = {
        filters: {
            tags: "",
            status: ""
        },
        active: "all",
        set: function(filter, tags, status) {
            this.filters.tags = tags;
            this.filters.status = status;
            this.active = filter;
        },
        clear: function() {
            this.set('all', '', '');
        },
        class: function(filter) {
            return filter === this.active ? 'active' : '';
        }
    };
});

ScavHQ.controller('PeopleCtrl', function($scope) {
});

ScavHQ.controller('MissionsCtrl', function($scope) {
});

ScavHQ.controller('ContactCtrl', function($scope) {
});
