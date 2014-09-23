(function(selfcare) {
  var defineHeaders = function($httpProvider , $translateProvider) {

  	//Set headers
    $httpProvider.defaults.headers.common['X-Obs-Platform-TenantId'] = 'default';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';


    // Configure i18n and preffer language
 	  //$translateProvider.translations('en', translationsEN);
  	//$translateProvider.translations('de', translationsDE);

    $translateProvider.useStaticFilesLoader({
          prefix: 'selfcare_module/global-translations/locale-',
          suffix: '.json'
    });

  	$translateProvider.preferredLanguage('is');
  	$translateProvider.fallbackLanguage('is');
  	
  };
  selfcare.ng.application.config(defineHeaders).run(function($log) {
	    $log.info("Initial tasks are done!");
	  });
}(selfcare || {}));
