
require.config({
    baseUrl: './scripts/',
    paths: {
        d3: 'bower_components/d3/d3',
        jquery: 'bower_components/jquery/dist/jquery',
        lodash: 'bower_components/lodash/dist/lodash',
        angular: 'bower_components/angular/angular',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
        moment: 'bower_components/momentjs/moment',
        bower_components: 'bower_components/',

        'angular-ui': 'bower_components/angular-bootstrap/ui-bootstrap',
        'angular-resource': 'bower_components/angular-resource/angular-resource',
        'angular-route': 'bower_components/angular-route/angular-route',
        'angular-gettext': 'bower_components/angular-gettext/dist/angular-gettext',
        'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
        'angular-file-upload': 'bower_components/ng-file-upload/angular-file-upload',
        'angular-file-upload-shim': 'bower_components/ng-file-upload/angular-file-upload-shim',
        'angular-slider': 'bower_components/angular-slider-royale/angular-slider',

        'moment-timezone': 'bower_components/moment-timezone/moment-timezone',

        'jquery-ui': 'bower_components/jquery-ui/jquery-ui',

        'bootstrap-daterange': 'bower_components/bootstrap-daterangepicker/daterangepicker',
        'raven-js': 'bower_components/raven-js/dist/raven'
    },
    shim: {
        jquery: {exports: 'jQuery'},
        d3: {exports: 'd3'},

        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },

        'raven-js': {exports: 'Raven'},
        'angular-resource': ['angular'],
        'angular-route': ['angular'],
        'angular-gettext': ['angular'],
        'angular-mocks': ['angular'],
        'angular-file-upload': ['angular', 'angular-file-upload-shim'],
        'bootstrap_ui': ['angular'],
        'translations': ['angular-gettext'],
        'angular-ui': ['angular', 'bootstrap'],
        'angular-slider': ['angular'],

        'bootstrap': ['jquery'],
        'jquery-ui': ['jquery'],
        'bootstrap/modal': ['jquery'],
        'bootstrap/dropdown': ['jquery'],
        'bootstrap-daterange': ['jquery', 'moment'],
        'bower_components/jcrop/js/jquery.Jcrop': ['jquery']
    }
});
