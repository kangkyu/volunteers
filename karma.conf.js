// Karma configuration
// Generated on Thu Feb 05 2015 00:04:29 GMT-0800 (PST)
var ANGULAR = 'bower_components/angular/angular.js';
var ANGULAR_ROUTE = 'bower_components/angular-route/angular-route.js';
var ANGULAR_MOCKS = 'bower_components/angular-mocks/angular-mocks.js';
var SOURCE_JS = 'app/app-module.js';
var SOURCE_JS_SUB = 'app/components/**/*.js';
var UNIT_TEST = 'test/unit/**/*_test.js';

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // list of files / patterns to load in the browser
    files: [
      ANGULAR,
      ANGULAR_ROUTE,
      ANGULAR_MOCKS,
      SOURCE_JS,
      SOURCE_JS_SUB,
      UNIT_TEST
    ],

    // list of files to exclude
    exclude: [
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO
  });
};
