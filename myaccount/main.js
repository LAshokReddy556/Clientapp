var selfcareApp = angular.module('selfcareApp',['configurations','ngResource','ngRoute','ui.bootstrap','pascalprecht.translate','modified.datepicker',
                                                	'webStorageModule','tmh.dynamicLocale','notificationWidget','LocalStorageModule','uiSwitch']);


selfcareApp.config(function($httpProvider ,$translateProvider) {
	
	//Set headers
    $httpProvider.defaults.headers.common['X-Obs-Platform-TenantId'] = selfcareModels.tenantId;
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    
	$translateProvider.useStaticFilesLoader({
        prefix: 'global-translations/locale-',
        suffix: '.json'
	});
	
	 $translateProvider.preferredLanguage(selfcareModels.locale);
});

SelfcareMainController = function(scope, translate,sessionManager,RequestSender,authenticationService,location,modal,localStorageService,tmhDynamicLocale,webStorage){
	
	//loading image is hide when we load this file
	   scope.domReady = true;
	   
	   //index page hiding when we reloading the page bcoz already signed
	   if(scope.selfcare_sessionData){
		   scope.isLandingPage= true;
	   }
	   
	   //index page hiding when client registration form appear
	   (location.path().match('/active') == '/active') ? (scope.isLandingPage= true,scope.isRegClientProcess = true) : scope.isRegClientProcess = false;
	   
	   
//calling this method every time if session is exit or not
	   sessionManager.restore(function(session) {
		   scope.currentSession = session;
	   });
	   
//setting the date format
scope.setDf = function () {
	   localStorageService.get('localeDateFormat') ? scope.df = scope.dateformat = localStorageService.get('localeDateFormat') 
			   								 : (localStorageService.add('localeDateFormat', 'dd MMMM yyyy'),
			   									scope.df = scope.dateformat = 'dd MMMM yyyy');
};scope.setDf();

	   

//getting languages form constant.js 
scope.langs = Langs;
var langCode = localStorageService.get('localeLang') || "";
if(angular.equals(langCode,"")){
	for(var i in scope.langs){
		if(scope.langs[i].code == selfcareModels.locale) {
			tmhDynamicLocale.set(scope.langs[i].code);
			scope.localeLang = scope.langs[i];
		}
	}
}else{
	   for ( var i in scope.langs) {
		   if(scope.langs[i].code == langCode){
			   scope.localeLang = scope.langs[i];
			   tmhDynamicLocale.set(langCode);
			   translate.uses(langCode);
			   break;
		   };
	   };
	   
}

//set the language code when change the language 
scope.changeLang = function (lang) {
	localStorageService.add('localeLang', lang.code);
	scope.localeLang = lang;
	tmhDynamicLocale.set(lang.code);
	translate.uses(lang.code);
};

//watching localeLangCode if modified then function executes else not execute
scope.$watch(function () {
	var code = localStorageService.get('localeLang');
	code ? langCode = code : langCode = selfcareModels.locale;
    return langCode;
}, function () {
    scope.localeLangCode = langCode;
});
 
 //cancel btn function ie going to previous page
 scope.goBack = function(){
	  window.history.go(-1);
 };
 window.setInterval(function(){

	 //checking session every  second when scope.currentSession.user not null
	 if((scope.currentSession.user != null)){
		 //in this checking is it Registration Page or not  
		 if(!(location.path().match('/active') == '/active')){
			 if(scope.selfcare_sessionData){}
			 else scope.signout();
		 }
	 }
   },1000);

//forgot password success msg popup controller
 var ForgotPwdPopupSuccessController = function($scope,$modalInstance){
		$scope.done = function(){
			$modalInstance.close('delete');
		};
};
		
//forgot password popup controller
	 var ForgotPwdPopupController = function($scope,$modalInstance){
		 
		 $scope.isProcessing = false;
		 
		 $scope.accept = function(email){
			 
			 $scope.formData = {'uniqueReference':email};
			 authenticationService.authenticateWithUsernamePassword(function(data){
			 
				 $scope.isProcessing = true;
				 $scope.stmError = null;
				 RequestSender.forgotPwdResource.update($scope.formData,function(successData){
					 
					 $scope.isProcessing = false;
					 $modalInstance.close('delete');
					 modal.open({
						 templateUrl: 'forgotpwdpopupsuccess.html',
						 controller: ForgotPwdPopupSuccessController,
						 resolve:{}
					 });
					 
				 },function(errorData){
					 $scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
					 $scope.isProcessing = false;
				 });
				 
			 });
		};
		
		$scope.reject = function(){
			$modalInstance.dismiss('cancel');
		};
	 };
	 
	 //for forgot password popup
	 scope.forgotPwdPopup = function(){
		 modal.open({
			 templateUrl: 'forgotpwdpopup.html',
			 controller: ForgotPwdPopupController,
			 resolve:{}
			});
	 };
	 
	//execute this fun when we click on header bar links 
	 scope.isActive = function (route) {
		 var active = route === location.path();
		 if(scope.selfcare_sessionData == null && location.path().match('/active')!='/active') 
			 location.path('/').replace();
		 return active;
	 };
	 
	 //fun executes when we click on logout link
	   scope.signout = function(){
			  var sessionData = localStorageService.get('loginHistoryId');
			  if(sessionData){
		          RequestSender.logoutResource.save({logout:'logout',id:sessionData},function(data){
		        	  scope.currentSession = sessionManager.clear();
	              });
			  }
	   };
	   
};

selfcareApp.controller('SelfcareMainController',['$rootScope',
                                                 '$translate',
                                                 'SessionManager',
                                                 'RequestSender',
                                                 'AuthenticationService',
                                                 '$location',
                                                 '$modal',
                                                 'localStorageService',
                                                 'tmhDynamicLocale',
                                                 'webStorage',
                                                 SelfcareMainController]);
