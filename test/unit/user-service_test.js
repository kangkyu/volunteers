'use strict';

describe('userService', function(){
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

    var userService, $httpBackend;
    beforeEach(function(){
        module('userServiceModule');

        inject(function($injector){
            userService = $injector.get('userService');
            $httpBackend = $injector.get('$httpBackend');
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('loadAll', function(){
        it("should get all users", function(){
            $httpBackend.expectGET(baseUrl).respond(mockUsers);

            var resultUsers;
            userService.loadAll().success(function(data){
                resultUsers = data;
            });

            $httpBackend.flush();
            expect(resultUsers).toEqual(mockUsers);
        });
    });

    var idPicked = "2", userPicked = {
        "_id": "2",
        "firstName": "Ty",
        "lastName": "Cobb",
        "email": "ty@example.com"
    };

    describe('loadById', function(){
        it("should get user when id matches one", function(){
            $httpBackend.expectGET(baseUrl + '/' + idPicked).respond(userPicked);

            var resultUser;
            userService.loadById(idPicked).success(function(data){
                resultUser = data;
            });

            $httpBackend.flush();
            expect(resultUser).toEqual(userPicked);
        });

        it("should get empty object when id doesn't match", function(){
            $httpBackend.expectGET(baseUrl + '/' + "nomatch").respond({});

            var resultUser;
            userService.loadById("nomatch").success(function(data){
                resultUser = data;
            });

            $httpBackend.flush();
            expect(resultUser).toEqual({});
        });
    });

    var userAdd = {
        "firstName": "Nap",
        "lastName": "Lajoie",
        "email": "napoleon@example.com"
    };
    var userAdded = {
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

    describe('addUser', function(){
        it('should add another user on the user list', function(){
            $httpBackend.expectPOST(baseUrl, userAdd).respond(userAdded);
            $httpBackend.expectGET(baseUrl).respond(usersAfterAdd);

            userService.addUser(userAdd);

            var resultUsers;
            userService.loadAll().success(function(data){
                resultUsers = data;
            });

            $httpBackend.flush();
            expect(resultUsers).toEqual(usersAfterAdd);
        });

        it("should add id to the added user", function(){
            $httpBackend.expectPOST(baseUrl, userAdd).respond(userAdded);
            var resultUser;
            userService.addUser(userAdd).success(function(data){
                resultUser = data;
            });
            $httpBackend.flush();
            expect(resultUser).toEqual(userAdded);
        });
    });

    var editUserId = 4, userEdited = {
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

    describe('updateUser', function(){
        it("should update the user", function(){
            $httpBackend.expectPUT(baseUrl + '/' + editUserId, userEdited).respond(userEdited);
            var resultUser;
            userService.updateUser(editUserId, userEdited).success(function(data){
                resultUser = data;
            });
            $httpBackend.flush();
            expect(resultUser).toEqual(userEdited);
        });

        it("should update user list with the updated user", function(){
            $httpBackend.expectPUT(baseUrl + '/' + editUserId, userEdited).respond(userEdited);
            $httpBackend.expectGET(baseUrl).respond(usersAfterUpdate);
            userService.updateUser(editUserId, userEdited);
            var resultUsers;
            userService.loadAll().success(function(data){
                resultUsers = data;
            });
            $httpBackend.flush();
            expect(resultUsers).toEqual(usersAfterUpdate);
        });
    });

    var idDeleting = 3, deletedUser = {
            "_id": "3",
            "firstName": "Christy",
            "lastName": "Mathewson",
            "email": "christopher@example.com"
    }, remainingUsers = [
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
            "_id": "4",
            "firstName": "Nap",
            "lastName": "Lajoie",
            "email": "napoleon@example.com"
        }
    ];

    describe('deleteUser', function(){
        it('should delete a user if id matching', function(){
            $httpBackend.expectDELETE(baseUrl + '/' + idDeleting).respond(deletedUser);
            var resultUser;
            userService.deleteUser(idDeleting).success(function(data){
                resultUser = data;
            });
            $httpBackend.flush();
            expect(resultUser).toEqual(deletedUser);
        });
        it('should be removed from user list if id matching', function(){
            $httpBackend.expectDELETE(baseUrl + '/' + idDeleting).respond(deletedUser);
            userService.deleteUser(idDeleting);
            $httpBackend.expectGET(baseUrl).respond(remainingUsers);
            var resultUsers;
            userService.loadAll().success(function(data){
                resultUsers = data;
            });
            $httpBackend.flush();
            expect(resultUsers).toEqual(remainingUsers);
        });

        it('should return empty object if nothing matches', function(){
            $httpBackend.expectDELETE(baseUrl +'/'+ 'nomatch').respond({});
            var result;
            userService.deleteUser('nomatch').success(function(data){
                result = data;
            });
            $httpBackend.flush();
            expect(result).toEqual({});
        });
        it('should not make any changes on user list if nothing matches', function(){
            $httpBackend.expectDELETE(baseUrl +'/' + "nomatch").respond({});
            userService.deleteUser("nomatch");
            $httpBackend.expectGET(baseUrl).respond(mockUsers);
            var resultUsers;
            userService.loadAll().success(function(data){
                resultUsers = data;
            });
            $httpBackend.flush();
            expect(resultUsers).toEqual(mockUsers);
        });

    });
});
