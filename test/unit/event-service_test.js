'use strict';

describe('eventService', function(){

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

    var idPicked = "3", eventPicked = {
        _id: "3",
        title: "World Cup",
        address: "Rio De Janeiro, Brazil",
        date: "Jun 12, 2014",
        time: "2pm"
    };

    var idToDelete = 1, eventDeleted = {
        _id: "1",
        title: "Olympics",
        address: "Rio De Janeiro, Brazil",
        date: "Aug 21, 2016",
        time: "1pm"
    };
    var deletedEvents = [
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

    var newEvent = {
        title: "Chinatown Moon Festival",
        address: "Los Angeles, California",
        date: "Sep 13, 2014",
        time: "8pm"
    };
    var newEventAdded = {
        _id: 5,
        title: "Chinatown Moon Festival",
        address: "Los Angeles, California",
        date: "Sep 13, 2014",
        time: "8pm"
    }
    var addedEvents = [
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
        },
        {
            _id: 5,
            title: "Chinatown Moon Festival",
            address: "Los Angeles, California",
            date: "Sep 13, 2014",
            time: "8pm"
        }
    ];

    var idEdited = 4, eventEdited = {
        title: "World Series Baseball",
        address: "Los Angeles, California",
        date: "Oct 21, 2015",
        time: "5pm"
    };
    var updatedEvents = [
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
            title: "World Series Baseball",
            address: "Los Angeles, California",
            date: "Oct 21, 2015",
            time: "5pm"
        }
    ];

    var eventService, $httpBackend;
    beforeEach(function(){
        module('eventServiceModule');

        inject(function($injector){
            eventService = $injector.get('eventService');
            $httpBackend = $injector.get('$httpBackend');
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('loadAll', function(){
        it("should get all events", function(){
            $httpBackend.expectGET('/api/events').respond(mockEvents);

            var resultEvents;
            eventService.loadAll().success(function(data){
                resultEvents = data;
            });

            $httpBackend.flush();
            expect(resultEvents).toEqual(mockEvents);
        });
    });

    describe('loadById', function(){
        it("should get an event with matching id", function(){
            $httpBackend.expectGET('/api/events/' + idPicked).respond(eventPicked);

            var resultEvent;
            eventService.loadById(idPicked).success(function(data){
                resultEvent = data;
            });

            $httpBackend.flush();
            expect(resultEvent).toEqual(eventPicked);
        });

        it("should get empty object when id doesn't match to any event", function(){
            $httpBackend.expectGET('/api/events/' + "nomatch").respond({});

            var resultEvent;
            eventService.loadById("nomatch").success(function(data){
                resultEvent = data;
            });

            $httpBackend.flush();
            expect(resultEvent).toEqual({});
        });
    });

    describe('addEvent', function(){
        it("should add an event to the event list", function(){
            $httpBackend.expectPOST('/api/events', newEvent).respond(newEventAdded);
            $httpBackend.expectGET('/api/events').respond(addedEvents);

            eventService.addEvent(newEvent);

            var resultEvents;
            eventService.loadAll().success(function(data){
                resultEvents = data;
            });
            $httpBackend.flush();
            expect(resultEvents).toEqual(addedEvents);
        });

        it("should return the added event", function(){
            $httpBackend.expectPOST('/api/events', newEvent).respond(newEventAdded);
            var resultEvent;
            eventService.addEvent(newEvent).success(function(data){
                resultEvent = data;
            });
            $httpBackend.flush();
            expect(resultEvent).toEqual(newEventAdded);
        });
    });

    describe('deleteEvent', function(){
        it("should delete a matching event with the id given", function(){
            $httpBackend.expectDELETE('/api/events/' + idToDelete).respond(eventDeleted);
            eventService.deleteEvent(idToDelete)
            $httpBackend.expectGET("/api/events").respond(deletedEvents);
            var resultEvents;
            eventService.loadAll().success(function(data){
                resultEvents = data;
            });
            $httpBackend.flush();
            expect(resultEvents).toEqual(deletedEvents);
        });

        it("should return the deleted event", function(){
            $httpBackend.expectDELETE('/api/events/' + idToDelete).respond(eventDeleted);
            var resultEvent;
            eventService.deleteEvent(idToDelete).success(function(data){
                resultEvent = data;
            });
            $httpBackend.flush();
            expect(resultEvent).toEqual(eventDeleted);
        });

        it("should get empty object when id doesn't match to any event", function(){
            $httpBackend.expectDELETE('/api/events/' + "nomatch").respond({});
            var resultEvent;
            eventService.deleteEvent("nomatch").success(function(data){
                resultEvent = data;
            });
            $httpBackend.flush();
            expect(resultEvent).toEqual({});
        });
    });

    describe('updateEvent', function(){
        it("should update the event with id into edited input", function(){
            $httpBackend.expectPUT('/api/events/' + idEdited, eventEdited).respond(eventEdited);
            $httpBackend.expectGET('/api/events').respond(updatedEvents);
            eventService.updateEvent(idEdited, eventEdited);

            var resultEvents;
            eventService.loadAll().success(function(data){
                resultEvents = data;
            });
            $httpBackend.flush();
            expect(resultEvents).toEqual(updatedEvents);
        });

        it("should return the updated event", function(){
            $httpBackend.expectPUT('/api/events/' + idEdited, eventEdited).respond(eventEdited);
            var resultEvent;
            eventService.updateEvent(idEdited, eventEdited).success(function(data){
                resultEvent = data;
            });
            $httpBackend.flush();
            expect(resultEvent).toEqual(eventEdited);
        });
    });
});

