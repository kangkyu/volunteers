'use strict';

describe('eventAddCtrl', function(){
    var eventToAdd = {
        title: "Moon Festival",
        address: "Chinatown, Los Angeles, California",
        date: "September 13, 2014",
        time: "6pm"
    };

    var eventAdded = {
        _id: 3,
        title: "Moon Festival",
        address: "Chinatown, Los Angeles, California",
        date: "September 13, 2014",
        time: "6pm"
    };

    var eventsBeforeAdd = [
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
        }
    ];

    var eventsAfterAdd = [
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
            _id: 3,
            title: "Moon Festival",
            address: "Chinatown, Los Angeles, California",
            date: "September 13, 2014",
            time: "6pm"
        }
    ];

    var $scope, eventService, $rootScope, $controller, eventAddCtrl, $httpBackend;
    beforeEach(function(){
        module('eventAddCtrlModule');
        module('eventServiceModule');

        inject(function($injector){
            eventService = $injector.get('eventService');
            $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
        });

        eventAddCtrl = $controller('eventAddCtrl',
            {
                $scope: $scope,
                eventService: eventService
            }
        );
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should add an event from the form input", function(){
        // mock data
        $httpBackend.expectPOST('/api/events', eventToAdd).respond(eventAdded);

        // actual function call
        $scope.addButton(eventToAdd);

        // compare mock data with the result of function
        $httpBackend.flush();
        expect($scope.event).toEqual(eventAdded);
    });
});
