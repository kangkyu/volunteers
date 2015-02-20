angular
.module('eventServiceModule', [])
.factory('eventService',['$http',
function($http){
    var eventService = {};

    eventService.loadAll = function(){
        return $http.get('http://localhost:3000/api/events');
    };

    eventService.loadById = function(id){
        return $http.get('http://localhost:3000/api/events' + '/' + id);
    };

    eventService.deleteEvent = function(id){
        return $http.delete('http://localhost:3000/api/events' + '/' + id);
    };


    eventService.addEvent = function(event){
        return $http.post('http://localhost:3000/api/events', event);
    };

    eventService.updateEvent = function(id, event){
        return $http.put('http://localhost:3000/api/events' + '/'+ id, event);
    };

    return eventService;
}]);
