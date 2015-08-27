//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/contacts', {
            templateUrl: 'views/contacts/list.html'
        }).
        when('/contacts/create', {
            templateUrl: 'views/contacts/create.html'
        }).
        when('/contacts/:contactId/edit', {
            templateUrl: 'views/contacts/edit.html'
        }).
        when('/contacts/:contactId', {
            templateUrl: 'views/contacts/view.html'
        }).
        when('/camps', {
            templateUrl: 'views/camps/list.html'
        }).
        when('/camps/create', {
            templateUrl: 'views/camps/create.html'
        }).
        when('/camps/:campId/edit', {
            templateUrl: 'views/camps/edit.html'
        }).
        when('/camps/:campId', {
            templateUrl: 'views/camps/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);