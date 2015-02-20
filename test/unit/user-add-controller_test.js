'use strict';

describe('userAddCtrl', function(){

    var userAdd = {
        "firstName": "Nap",
        "lastName": "Lajoie",
        "email": "napoleon@example.com"
    };
    var userAfterAdd = {
        "_id": "4",
        "firstName": "Nap",
        "lastName": "Lajoie",
        "email": "napoleon@example.com"
    };
    var usersAfterAdd = [
        {
            "_id": "1",
            "firstName": "Randy",
            "lastName": "Johnson",
            "email": "randy@example.com"
        },
        {
            "_id": "2",
            "firstName": "Ty",
            "lastName": "Cobb",
            "email": "ty@example.com"
        },
        {
            "_id": "3",
            "firstName": "Christy",
            "lastName": "Mathewson",
            "email": "christopher@example.com"
        },
        {
            "_id": "4",
            "firstName": "Nap",
            "lastName": "Lajoie",
            "email": "napoleon@example.com"
        }
    ];

    var $controller, $rootScope, $scope, $httpBackend, userService, userAddCtrl;
    beforeEach(function(){
        module('userAddCtrlModule');
        module('userServiceModule');

        inject(function($injector){
            $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            userService = $injector.get('userService');
            $httpBackend = $injector.get('$httpBackend');
        });

        userAddCtrl = $controller('userAddCtrl',
            {
                $scope: $scope,
                userService: userService
            }
        );
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add a user', function(){
        $httpBackend.expectPOST('/api/users', userAdd).respond(userAfterAdd);
        // $httpBackend.expectGET('/api/users').respond(usersAfterAdd);

        $scope.addUser(userAdd);
        $httpBackend.flush();
        expect($scope.user).toEqual(userAfterAdd);
    });
});