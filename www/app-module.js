angular
.module('volunteerApp', 
[
    'ionic',

    'userIndexCtrlModule',
    'userServiceModule',
    'eventIndexCtrlModule',
    'eventServiceModule',
    'eventShowCtrlModule',
    'eventAddCtrlModule',
    'eventEditCtrlModule',
    'userAddCtrlModule',
    'userEditCtrlModule',
    'userShowCtrlModule',
    
    'DashCtrlModule',

    'mainCtrlModule'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "components/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
          url: '/dash',
          views: {
                'tab-dash': {
                    templateUrl: 'components/tab-dash.html',
                    controller: 'DashCtrl'
              }
          }
    })


    .state('tab.users',{
        url: '/users',
        views: {
            'tab-users': {
                templateUrl: 'components/users/user-index.html',
                controller: 'userIndexCtrl'
            }
        }
    })
    .state('tab.user-detail',{
        url: '/users/:userId',
        views: {
            'tab-users': {
                templateUrl: 'components/users/user-show.html',
                controller: 'userShowCtrl'
            }
        }
    })
    .state('tab.events',{
        url: '/events',
        views: {
            'tab-events': {
                templateUrl: 'components/events/event-index.html',
                controller: 'eventIndexCtrl'
            }
        }
    })
    .state('tab.event-detail',{
        url: '/events/:eventId',
        views: {
            'tab-events': {
                templateUrl: 'components/events/event-show.html',
                controller: 'eventShowCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/tab/dash');

  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // })

});
