angular.module('mean.contacts').controller('contactsController', ['$scope', '$routeParams', '$location', 'Global', 'contacts', function ($scope, $routeParams, $location, Global, contacts) {
    $scope.global = Global;

    $scope.create = function() {
        var contact = new contacts({
            title: this.title,
            content: this.content
        });

        contact.$save(function(response) {
            console.log(response);
            $location.path("contacts/" + response.id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(contact) {
        if (contact) {
            contact.$remove();  

            for (var i in $scope.contacts) {
                if ($scope.contacts[i] == contact) {
                    $scope.contacts.splice(i, 1);
                }
            }
        }
        else {
            $scope.contact.$remove();
            $location.path('contacts');
        }
    };

    $scope.update = function() {
        var contact = $scope.contact;
        if (!contact.updated) {
            contact.updated = [];
        }
        contact.updated.push(new Date().getTime());

        contact.$update(function() {
            $location.path('contacts/' + contact.id);
        });
    };

    $scope.find = function() {
        contacts.query(function(contacts) {
            $scope.contacts = contacts;
        });
    };

    $scope.findOne = function() {
        contacts.get({
            contactId: $routeParams.contactId
        }, function(contact) {
            $scope.contact = contact;
        });
    };
}]);