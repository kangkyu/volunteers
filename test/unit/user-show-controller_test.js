'use strict';

describe('userShowModule', function(){

    var mockUserId = 4, userFound = {
         _id: '4',
         firstName: 'Nap',
         lastName: 'Lajoie',
         email: 'napoleon@example.com',
         eventId: '3',
         userEvent: { _id: '3', title: 'Super Bowl', address: 'Phoenix, Arizona', date: 'Feb 1, 2015', time: '2am' }
    };

    var $scope, $routeParams, userService, eventService, $rootScope, $controller, userShowCtrl, $httpBackend;
    beforeEach(function(){
        module("userShowCtrlModule");
        module("userServiceModule");
        module("eventServiceModule");

        inject(function($injector){
            userService = $injector.get('userService');
            eventService = $injector.get('eventService');
            $routeParams = { 'userId': mockUserId };
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $controller = $injector.get('$controller');
            $httpBackend = $injector.get('$httpBackend');
        });

        userShowCtrl = $controller('userShowCtrl', {
            $scope: $scope,
            userService: userService,
            eventService: eventService,
            $routeParams: $routeParams
        });
    });

    it('should find a user by userId', function(){
        $httpBackend.expectGET('/api/users/' + mockUserId).respond(userFound);
        $httpBackend.flush();

        expect($scope.user).toEqual(userFound);
    });

});

