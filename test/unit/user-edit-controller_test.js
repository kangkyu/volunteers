'use strict';

describe('userEditCtrl', function(){
    var baseUrl = 'http://localhost:3000/api/users';

    var mockUsers = [
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

    var editUserId = 4, userEdit = {
        "_id": "4",
        "firstName": "Nap",
        "lastName": "Lajoie",
        "email": "napoleon@example.com"
    }, userEdited = {
        "_id": "4",
        "firstName": "Napoleon",
        "lastName": "Lajoie",
        "email": "naplajoie@example.com"
    };

    var usersAfterUpdate = [
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
            "firstName": "Napoleon",
            "lastName": "Lajoie",
            "email": "naplajoie@example.com"
        }
    ];

    var userService, userEditCtrl, $scope, $rootScope, $controller, $httpBackend, $routeParams;
    beforeEach(function(){
        module('userEditCtrlModule');
        module('userServiceModule');

        inject(function($injector){
            userService = $injector.get('userService');
            $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $routeParams = {'userId': editUserId};
            $httpBackend = $injector.get('$httpBackend');
        });

        userEditCtrl = $controller('userEditCtrl', {
            $scope: $scope,
            userService: userService,
            $routeParams: $routeParams
        });
    });

    it('should show pre-filled form to edit', function(){
        $httpBackend.expectGET(baseUrl + '/'+ $routeParams.userId).respond(userEdit);
        $httpBackend.flush();

        expect($scope.user).toEqual(userEdit);
    });

    describe('updateUser', function(){
        it("should update by submit of edited form", function(){
            $httpBackend.expectGET(baseUrl + '/'+ $routeParams.userId).respond(userEdit);
            $httpBackend.expectPUT(baseUrl + '/'+ $routeParams.userId, userEdited).respond(userEdited);

            $scope.updateUser(userEdited);
            $httpBackend.flush();
            expect($scope.user).toEqual(userEdited);
        });
    });
});
