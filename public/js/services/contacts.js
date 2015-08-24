//contacts service used for contacts REST endpoint
angular.module('mean.contacts').factory("contacts", ['$resource', function($resource) {
    return $resource('contacts/:contactId', {
        articleId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);