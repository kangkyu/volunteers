angular
.module('eventServiceModule', [])
.factory('eventService',['$http',
function($http){
    var eventService = {};
    var baseUrl = 'http://localhost:3000/api/events';
    // var baseUrl = 'http://104.236.237.119:3000/api/events'

    eventService.loadAll = function(){
        return $http.get(baseUrl);
    };

    eventService.loadById = function(id){
        return $http.get(baseUrl + '/' + id);
    };

    eventService.deleteEvent = function(id){
        return $http.delete(baseUrl + '/' + id);
    };


    eventService.addEvent = function(event){
        return $http.post(baseUrl, event);
    };

    eventService.updateEvent = function(id, event){
        return $http.put(baseUrl + '/'+ id, event);
    };

    return eventService;
}]);
