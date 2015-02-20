'use strict';

describe('eventIndexCtrl', function(){

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

    var eventIdDelete = 1, eventsAfterDelete = [
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

    var $scope, $rootScope, eventIndexCtrl, $controller, eventService, $httpBackend;
    beforeEach(function(){
        module("eventIndexCtrlModule");
        module("eventServiceModule");

        inject(function($injector){
            eventService = $injector.get('eventService');
            $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
        });

        eventIndexCtrl = $controller('eventIndexCtrl',{
            $scope: $scope,
            eventService: eventService,
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should have all events under scope", function(){
        // mock data
        $httpBackend.expectGET('/api/events').respond(mockEvents);
        $httpBackend.flush();

        // actual function call
        
        // compare mock data with the result of function
        expect($scope.events).toEqual(mockEvents);
    });

    it("should be able to delete an event by its delete button", function(){
        // mock data
        $httpBackend.expectGET('/api/events').respond(mockEvents);
        $httpBackend.expectDELETE('/api/events/' + eventIdDelete).respond(eventsAfterDelete);
        $httpBackend.expectGET('/api/events').respond(eventsAfterDelete);

        // actual function call
        $scope.deleteButton(eventIdDelete);

        // compare mock data with the result of function
        $httpBackend.flush();
        expect($scope.events).toEqual(eventsAfterDelete);
    });
});
