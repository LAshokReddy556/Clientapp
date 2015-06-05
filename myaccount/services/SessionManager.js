selfcareApp.service("SessionManager",['$rootScope','HttpService','$location','localStorageService',
                                      			function(scope, httpService,location,localStorageService){
	
      var EMPTY_SESSION = {user:null};

      this.clear = function() {
    	localStorageService.remove("selfcare_sessionData");
    	localStorageService.remove("clientTotalData");
        localStorageService.remove('localeLang');
        localStorageService.remove('selfcareAppUrl');
        localStorageService.remove('loginHistoryId');
        localStorageService.remove('isAutoRenewConfig');
        httpService.cancelAuthorization();
        scope.isLandingPage= false;scope.isRegClientProcess = false;
		location.path('/').replace();
        return scope.currentSession= {user:null};
      };

        this.restore = function(handler) {
            scope.selfcare_sessionData = localStorageService.get('selfcare_sessionData');
            if (scope.selfcare_sessionData !== null) {
              httpService.setAuthorization(scope.selfcare_sessionData.authenticationKey);
            	  var clientData = localStorageService.get("clientTotalData");
            	  if(clientData){
            		  scope.selfcare_userName = clientData.displayName;
            		  clientData.selfcare.token ? scope.iskortaTokenAvailable = true :  scope.iskortaTokenAvailable = false;
	            		//adding web tv url
	           		   scope.webtvURL = selfcareModels.webtvURL+"?id="+clientData.id;
	           		   localStorageService.add("selfcareAppUrl",selfcareModels.selfcareAppUrl);
            		  if(location.path() == "/")location.path('/profile');
            		  else if(location.path())location.path(location.path());
            		  else location.path('/profile');
            	  }
                handler({user: 'selfcare'});
            } else {
            	localStorageService.remove('localeLang');
              handler(EMPTY_SESSION);
            }
        };
}]);