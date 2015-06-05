ProfileController = function(scope,RequestSender,rootScope,location,paginatorService,localStorageService, API_VERSION) {
		  
		  var totalStatementsData = [];var retrivingStatementsData = {};scope.statementsData = [];
          scope.getStatementsData = function(offset, limit, callback) {
        	  
			  retrivingStatementsData.pageItems = [];
			  var itrCount = 0;
			  for (var i=offset;i<totalStatementsData.length;i++) {
				 itrCount += 1;
				 retrivingStatementsData.pageItems.push(totalStatementsData[i]);
				 if(itrCount==limit){
					 break;
				 }
		      }
			  callback(retrivingStatementsData);
	  	   };
	  	   
		 if(rootScope.selfcare_sessionData){		  
			  scope.clientId = rootScope.selfcare_sessionData.clientId;
			  RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
				  scope.clientData = data;
				  if(data.selfcare){
					  data.selfcare.token ? rootScope.iskortaTokenAvailable = true : rootScope.iskortaTokenAvailable = false;
					  !data.selfcare.authPin ? scope.clientData.selfcare.authPin = 'Not Available':null;
				  }
				  rootScope.selfcare_userName = data.displayName;
				  localStorageService.add("clientTotalData",data);
				  
				  RequestSender.statementResource.query({clientId: scope.clientId} , function(data) {	
					  totalStatementsData = data;
					  retrivingStatementsData.totalFilteredRecords = totalStatementsData.length;
					  scope.statementsData = paginatorService.paginate(scope.getStatementsData, 2);
					  
					//getting data from c_configuration for isRegister_plan and isisDeviceEnabled
	  					 var registrationListing = {};
	  					  RequestSender.configurationResource.get(function(data){
	  						var configType = angular.fromJson(data.clientConfiguration);
	  						if(configType) registrationListing	= configType.registrationListing;
	  						scope.isConfigNationalId 			= configType.nationalId;
	  						scope.isConfigPassport				= registrationListing.passport;
	  						localStorageService.add("isAutoRenewConfig",configType.isAutoRenew);
	  						if(scope.isConfigPassport){
	  							RequestSender.clientIdentifiersResource.query({clientId:scope.clientId},function(identifiersdata){
	  								angular.forEach(identifiersdata,function(val,key){
	  									if(angular.lowercase(val.documentType['name']) == 'passport'){
	  										scope.passport = val.documentKey;
	  									}
	  								});
	  							});
	  						}
	  					  });
				  });
				
			  });
		  }
		 
		  scope.routeTostatement = function(statementid){
             location.path('/viewstatement/'+statementid);
           };
           
           scope.downloadFile = function (statementId){
	           window.open(rootScope.hostUrl+ API_VERSION +'/billmaster/'+ statementId +'/print?tenantIdentifier='+selfcareModels.tenantId);
	      };
		 
		
    };
    
selfcareApp.controller('ProfileController', ['$scope',
                                             'RequestSender',
                                             '$rootScope',
                                             '$location',
                                             'PaginatorService', 
                                             'localStorageService', 
                                             'API_VERSION', 
                                             ProfileController]);
