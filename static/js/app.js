var ScavHQ = angular.module('ScavHQ', ['ngRoute']);

ScavHQ.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/items', {
            templateUrl: 'static/js/partials/items.html',
            controller: 'ItemsCtrl' }).
        when('/people', {
            templateUrl: 'static/js/partials/people.html',
            controller: 'PeopleCtrl' }).
        when('/missions', {
            templateUrl: 'static/js/partials/missions.html',
            controller: 'MissionsCtrl' }).
        when('/contact', {
            templateUrl: 'static/js/partials/contact.html',
            controller: 'ContactCtrl' }).
        otherwise({
            redirectTo: '/items' });
}]);

ScavHQ.filter('titleize', function() {
    return function(input, scope) {
        if (input!=null)
            input = input.toLowerCase();

        return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});
