(function() {
    require.config({
    	 waitSeconds: 200,
        paths: {
            'jquery':           '../bower_components/jquery/jquery',
            'jquery-ui':        '../bower_components/jquery-ui/ui/jquery-ui',
            'data-tables':      '../bower_components/datatables/media/js/jquery.dataTables',
            'blockUI':          '../bower_components/blockui/jquery.blockUI',
            'angular':          '../bower_components/angular/angular',
            'angular-resource': '../bower_components/angular-resource/angular-resource',
            'angular-route': '../bower_components/angular-route/angular-route',
            'angular-translate':'../bower_components/angular-translate/angular-translate',
            'angular-translate-loader-static-files':'../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
            'angular-mocks':    '../bower_components/angular-mocks/angular-mocks',
            'angularui':        '../bower_components/angular-bootstrap/ui-bootstrap',
            'angularuitpls':    '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
            'underscore':       '../bower_components/underscore/underscore',
            'webstorage':       '../bower_components/angular-webstorage/angular-webstorage',
            'require-css':      '../bower_components/require-css/css',
            'd3':               '../bower_components/d3/d3',
            'nvd3':             '../bower_components/nvd3/nv.d3',
            'bootstrap-switch': '../additionals/bootstrap-switch',
            'nvd3ChartDirectives':'../scripts/directives/angularjs-nvd3-directives',
            'styles':           '../styles',
            'test':             '../../test/functional',
            'notificationWidget':'../scripts/modules/notificationWidget',
            'frAngular':        '../scripts/modules/KeyboardManager',
            'modified.datepicker':'../scripts/modules/datepicker',
            'angularFileUpload':'../bower_components/angularjs-file-upload/angular-file-upload',
            'ngSanitize':       '../bower_components/angular-sanitize/angular-sanitize',
            'bootstraptimepicker':	'../bower_components/bootstrap-timepicker/js/bootstrap-timepicker',
            'ckEditor':         '../bower_components/ckeditor/ckeditor',
            'LocalStorageModule':'../scripts/modules/localstorage',
            'configurations':'../scripts/modules/configurations',
            'chosen.jquery.min': "../scripts/modules/chosen.jquery.min",
            'aes':'../scripts/CryptoJS/rollups/aes',
            'multiple':'./modules/jquery.multiple.select',
            'ngIdle': '../bower_components/ng-idle/angular-idle.min',
            'md5': './CryptoJS/md5',
            'tmh.dynamicLocale': '../bower_components/angular-dynamic-locale/tmhDynamicLocale.min',
            'moment': './calendar/moment.min',
            'fullcalendar': './calendar/fullcalendar.min',
           

        },
        shim: {
            'angular': { exports: 'angular' },
            'angular-resource': { deps: ['angular'] },
            'angular-route': { deps: ['angular'] },
            'angular-translate': { deps: ['angular'] },
            'angular-translate-loader-static-files': {deps: ['angular' , 'angular-translate'] },
            'angularui': { deps: ['angular'] },
            'angularuitpls': { deps: ['angular' ,'angularui' ] },
            'angular-mocks': { deps: ['angular'] },
            'webstorage': { deps: ['angular'] },
            'jquery-ui': { deps: ['jquery'] },
            'd3': {exports: 'd3'},
            'nvd3': { deps: ['d3']},
            'nvd3ChartDirectives': {deps: ['angular','nvd3']},
            'notificationWidget':{deps: ['angular','jquery'],exports:'notificationWidget'},
            'angularFileUpload':{deps: ['angular','jquery'],exports:'angularFileUpload'},
            'modified.datepicker':{deps: ['angular']},
            'ngSanitize':{deps:['angular'],exports:'ngSanitize'},
            'bootstraptimepicker':{deps:['jquery']},
            'frAngular':{deps:['angular']},
            'ckEditor':{deps:['jquery']},
            'LocalStorageModule':{deps:['angular']},
            'configurations':{deps: ['angular']},
            'chosen.jquery.min': {deps: ['jquery']},
            'aes':{deps: ['jquery']},
            'multiple':{deps: ['jquery']},
            'md5':{deps: ['jquery']},
            'ngIdle': {deps: ['angular']},
            'tmh.dynamicLocale': {deps: ['angular']},
            'bootstrap-switch': {deps: ['jquery']},
            'moment': {deps: ['jquery']},
            'fullcalendar': {deps: ['jquery']},

            'mifosX': {
                deps: [
                    'angular',
                    'jquery',
                    'angular-resource',
                    'angular-route',
                    'angular-translate',
                    'angular-translate-loader-static-files',
                    'angularui',
                    'angularuitpls',
                    'webstorage',
                    'data-tables',
                    'blockUI',
                    'jquery-ui',
                    'nvd3ChartDirectives',
                    'notificationWidget',
                    'angularFileUpload',
                    'modified.datepicker',
                    'ngSanitize',
                    'bootstraptimepicker',
                    'ckEditor',
                    'frAngular',
                    'LocalStorageModule',
                    'configurations',
                    'chosen.jquery.min',
                    'aes',
                    'multiple',
                    'ngIdle',
                    'md5',
                    'tmh.dynamicLocale',
                    'bootstrap-switch',
                    'moment',
                    'fullcalendar'


                ],
                exports: 'mifosX'
            }
        },
        packages: [
            {
                name: 'css',
                location: '../bower_components/require-css',
                main: 'css'
            }
        ]
    });

    require(['mifosXComponents', 'mifosXStyles'], function() {
        require(['test/testInitializer'], function(testMode) {
            if (!testMode) {
                angular.bootstrap(document, ["MifosX_Application"]);
            }
        });
    });
}());
