module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'client/lib/angular/angular.js',
      'client/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'client/js/**/*.js',
      //'test/unit/**/*.js',
      'common/js/**/*.js',
      'test/unit/**/common.js'
    ],

		exclude: ['client/lib/angular/angular-loader*.js'],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'       
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
