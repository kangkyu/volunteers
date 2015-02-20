'use strict';

describe('eventShowCtrlModule', function(){
    var mockEvents = [
        {
            _id: "1",
            title: "Olympics",
            address: "Rio De Janeiro, Brazil",
            date: "Aug 21, 2016",
            time: "1pm"
        },
        {
            _id: "2",
            title: "Super Bowl",
            address: "Phoenix, Arizona",
            date: "Feb 1, 2015",
            time: "2am"
        },
        {
            _id: "3",
            title: "World Cup",
            address: "Rio De Janeiro, Brazil",
            date: "Jun 12, 2014",
            time: "2pm"
        },
        {
            _id: "4",
            title: "World Series",
            address: "San Francisco, California",
            date: "Oct 21, 2014",
            time: "3pm"
        }
    ];

    var mockEventId = "2";
    var eventFound = {
        _id: "2",
        title: "Super Bowl",
        address: "Phoenix, Arizona",
        date: "Feb 1, 2015",
        time: "2am"
    };

    var eventsAfterDelete = [
        {
            _id: "1",
            title: "Olympics",
            address: "Rio De Janeiro, Brazil",
            date: "Aug 21, 2016",
            time: "1pm"
        },
        {
            _id: "3",
            title: "World Cup",
            address: "Rio De Janeiro, Brazil",
            date: "Jun 12, 2014",
            time: "2pm"
        },
        {
            _id: "4",
            title: "World Series",
            address: "San Francisco, California",
            date: "Oct 21, 2014",
            time: "3pm"
        }
    ];

    var $scope, $rootScope, $routeParams, $controller, eventShowCtrl, eventService, $httpBackend;
    beforeEach(function(){
        module("eventShowCtrlModule");
        module("eventServiceModule");

        inject(function($injector){
            eventService = $injector.get('eventService');
            $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $routeParams = { 'eventId': mockEventId };
            $httpBackend = $injector.get('$httpBackend');
        });

        eventShowCtrl = $controller('eventShowCtrl', {
            $scope: $scope,
            $routeParams: $routeParams,
            eventService: eventService
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should find a event object with event id on url', function(){
        // mock data
        $httpBackend.expectGET('/api/events/' + mockEventId).respond(eventFound);
        $httpBackend.flush();

        // actual function call

        // compare mock data with the result of function
        expect($scope.event).toEqual(eventFound);
    });

    it("should be able to delete an event by its delete button", function(){
        // mock data
        $httpBackend.expectGET('/api/events/' + mockEventId).respond(eventFound);
        $httpBackend.expectDELETE('/api/events/' + mockEventId).respond(eventsAfterDelete);
        $httpBackend.expectGET('/api/events').respond(eventsAfterDelete);

        // actual function call
        $scope.deleteButton(mockEventId);

        // compare mock data with the result of function
        $httpBackend.flush();
        expect($scope.events).toEqual(eventsAfterDelete);
    });
});
