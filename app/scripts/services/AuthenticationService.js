(function(module) {
  mifosX.services = _.extend(module, {
    AuthenticationService: function(scope, httpService,location,localStorageService,resourceFactory,webStorage,$modal,rootScope) {
    	scope.activity = {};
        scope.activityQueue = [];
      var onSuccess = function(data) {
    	var successData = data;
        scope.$broadcast("UserAuthenticationSuccessEvent", data);
        webStorage.add("userData",data);
        
        if(localStorageService.get('Location')){
        scope.activityQueue = localStorageService.get('Location');
        }
        scope.setDf = function(){

            	resourceFactory.configurationResource.get(function(data) {
            		scope.clientConfigs = data.clientConfiguration;
            		scope.globalconfigs = data.globalConfiguration;
            		var clientConfigurations = JSON.parse(scope.clientConfigs);
            		webStorage.add("client_configuration",JSON.parse(scope.clientConfigs));
            		webStorage.add("global_configuration",scope.globalconfigs);
            		if(clientConfigurations){
                    	localStorageService.add('dateformat',clientConfigurations.date_format);
                    	scope.dateformat = clientConfigurations.date_format;
            		}
                    	
                	for(var i in data.globalConfiguration){
                        if(data.globalConfiguration[i].name=="device-agrement-type"){
                        	  webStorage.add("CPE_TYPE",data.globalConfiguration[i].value);
                        	  
                        }if(data.globalConfiguration[i].name=="registration-requires-device"){
                        	  webStorage.add("Registration_requires_device",data.globalConfiguration[i].enabled);
                        	  
                        }if(data.globalConfiguration[i].name=="is-wallet-enable"){
                        	  webStorage.add("is-wallet-enable",data.globalConfiguration[i].enabled);
                        }if(data.globalConfiguration[i].name=="client-additional-data"){
                        	  webStorage.add("client-additional-data",data.globalConfiguration[i].enabled);
                        }
                        
                    }
                	
                	//popUp open
                	if(successData.notificationMessage){
                		$modal.open({
      		  	                templateUrl: 'licensemessagespopup.html',
      		  	                controller: LicenseMessagesPopup,
      		  	                resolve:{}
      		  	         });
                	
                	}
                	function  LicenseMessagesPopup($scope, $modalInstance) {
                		rootScope.licenseMsg = successData.notificationMessage;
                		$scope.approve = function () { 
                			$modalInstance.dismiss('cancel');
                		};
                	}
                });
       
        scope.df = scope.dateformat;
        };
        scope.setDf();	
        if(data.userRole[0].name =="Partner"){
        	 httpService.get(apiVer + "/partners/"+data.userId + "/images").then(function(imageData){
        		 scope.image = imageData.data;
        		
        	 });
        }
        
      };
      

    scope.clearImage = function() {
	     	delete scope.image;
	};

      var onFailure = function(data) {
        scope.$broadcast("UserAuthenticationFailureEvent", data);
        
      };
      scope.$watch(function() {
          return location.path();
      }, function() {
          scope.activity= location.path();
          scope.activityQueue.push(scope.activity);
          localStorageService.add('Location',scope.activityQueue);
      });
      var apiVer = '/obsplatform/api/v1';
    
      this.authenticateWithUsernamePassword = function(credentials) {
        scope.$broadcast("UserAuthenticationStartEvent");
       
        httpService.post(apiVer + "/authentication?username="+ credentials.username+ "&password=" + credentials.password)
          .success(onSuccess)
          .error(onFailure);
      };
   
    }
  });
  mifosX.ng.services.service('AuthenticationService', ['$rootScope', 'HttpService','$location','localStorageService','ResourceFactory','webStorage','$modal','$rootScope', mifosX.services.AuthenticationService]).run(function($log) {
    $log.info("AuthenticationService initialized");
  });
}(mifosX.services || {}));


/*resourceFactory.configurationResource.get(function(data) {
for(var i in data.globalConfiguration){
	if(data.globalConfiguration[i].name=="DateFormat"){
		localStorageService.add('dateformat',data.globalConfiguration[i].value);
		scope.dateformat = data.globalConfiguration[i].value;
		console.log(scope.dateformat);
	}
}

});*/


