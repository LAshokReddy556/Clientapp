selfcareApp.service("SessionManager",['$rootScope','HttpService','$location','localStorageService','RequestSender',
                                      			function(scope, httpService,location,localStorageService,RequestSender){
	
      var EMPTY_SESSION = {user:null};

      this.clear = function() {
    	localStorageService.remove("selfcare_sessionData");
        localStorageService.remove('localeLang');
        localStorageService.remove('selfcareAppUrl');
        localStorageService.remove('loginHistoryId');
        localStorageService.remove('isAutoRenewConfig');
        httpService.cancelAuthorization();
        scope.isLandingPage= false;scope.isRegClientProcess = false;
		location.path('/').replace();
        return scope.currentSession= {user:null};
      };
      
      this.configurationFun = function(handler){
    	  RequestSender.clientResource.get({clientId: scope.selfcare_sessionData.clientId} , function(clientData) {
    		  scope.clientData = clientData || {};
    		  scope.currencyCode = scope.clientData.currency;
        		RequestSender.configurationResource.get({tenant:selfcareModels.tenantId},function(configData){
        			var clientConfig = angular.fromJson(configData.clientConfiguration) || {};
        			scope.isConfigNationalId 			= clientConfig.nationalId == 'true';
        			var registrationListing				= clientConfig.registrationListing || {};
        			scope.isConfigPassport				= registrationListing[selfcareModels.isPassport] == 'true';
        			localStorageService.add("isAutoRenewConfig",clientConfig.isAutoRenew);
        			var configurationDatas = configData.globalConfiguration;
					  for(var i in configurationDatas){
						 if(configurationDatas[i].name==selfcareModels.isRedemption){
							  scope.isRedemptionConfig = configurationDatas[i].enabled;
					      }
						 if(configurationDatas[i].name==selfcareModels.isClientAdditionalData){
							 scope.isClientAdditionalData = configurationDatas[i].enabled;
						 }
					  }
					  
					  handler(clientData);
        		});
    	  });
      };

        this.restore = function(handler) {
            scope.selfcare_sessionData = localStorageService.get('selfcare_sessionData');
            if (scope.selfcare_sessionData !== null) {
              httpService.setAuthorization(scope.selfcare_sessionData.authenticationKey);
               this.configurationFun(function(data){
            	   if(data){
            		   scope.selfcare_userName = data.displayName;
            		   if(data.selfcare)
            			   data.selfcare.token ? scope.iskortaTokenAvailable = true :  scope.iskortaTokenAvailable = false;
            		   //adding web tv url
            		   scope.webtvURL = selfcareModels.webtvURL+"?id="+data.id;
            		   localStorageService.add("selfcareAppUrl",selfcareModels.selfcareAppUrl);
            		   if(location.path() == "/")location.path('/profile');
            		   else if(location.path())location.path(location.path());
            		   else location.path('/profile');
            	   }
               });
                handler({user: 'selfcare'});
            } else {
            	localStorageService.remove('localeLang');
              handler(EMPTY_SESSION);
            }
        };
}]);