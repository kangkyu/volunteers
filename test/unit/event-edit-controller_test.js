'use strict';

describe('eventEditCtrl', function(){
    var baseUrl = 'http://localhost:3000/api/events';
    
    var editId = 3, eventEdit = {
        _id: 3,
        title: "Moon Festival",
        address: "Chinatown, Los Angeles, California",
        date: "September 13, 2014",
        time: "6pm"
    }, eventUpdated = {
        _id: 3,
        title: "Moon Cake Festival",
        address: "Chinatown, Los Angeles",
        date: "September 13, 2014",
        time: "2am"
    };

    var eventsBeforeEdit = [
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

    var eventsAfterEdit = [
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
            title: "Moon Cake Festival",
            address: "Chinatown, Los Angeles",
            date: "September 13, 2014",
            time: "2am"
        }
    ];

    var eventService, eventEditCtrl, $scope, $rootScope, $controller, $httpBackend, $stateParams;
    beforeEach(function(){
        module('eventEditCtrlModule');
        module('eventServiceModule');

        inject(function($injector){
            eventService = $injector.get('eventService');
            $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $stateParams = {'eventId': editId};
            $httpBackend = $injector.get('$httpBackend');
        });

        eventEditCtrl = $controller('eventEditCtrl',
            {
                $scope: $scope,
                eventService: eventService,
                $stateParams: $stateParams
            }
        );
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should show pre-filled event attributes on edit form", function(){
        $httpBackend.expectGET(baseUrl + '/' + $stateParams.eventId).respond(eventEdit);
        $httpBackend.flush();

        expect($scope.event).toEqual(eventEdit);
    });

    describe('updateButton', function(){

        it("should edit an event from the form", function(){
            // mock data
            $httpBackend.expectGET(baseUrl + '/' + $stateParams.eventId).respond(eventEdit);
            $httpBackend.whenPUT(baseUrl + '/'+ $stateParams.eventId, eventUpdated).respond(eventUpdated);

            // actual function call
            $scope.updateButton(eventUpdated);

            // compare mock data with the result of function
            $httpBackend.flush();
            expect($scope.event).toEqual(eventUpdated);
        });
    });
});
