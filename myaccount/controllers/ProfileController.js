ProfileController = function(scope,RequestSender,rootScope,webStorage,location,paginatorService,localStorageService, API_VERSION) {
		  
		  scope.clientData = {};
		  
		  var totalStatementsData = [];
		  var retrivingStatementsData = {};
		  scope.statementsData = [];
		  
		  /*var totalTicketsData = [];
		  var retrivingTicketsData = {};
		  scope.ticketsData=[];*/
		  
		  
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
	  	   
	  	  /* scope.getTicketsData = function(offset, limit, callback) {
	  		   
	  		   retrivingTicketsData.pageItems = [];
	  		   var itrCount = 0;
	  		   for (var i=offset;i<totalTicketsData.length;i++) {
	  			   itrCount += 1;
	  			   retrivingTicketsData.pageItems.push(totalTicketsData[i]);
	  			   if(itrCount==limit){
	  				   break;
	  			   }
	  		   }
	  		   callback(retrivingTicketsData);
	  	   };*/
	  	 var sessionData= localStorageService.get('selfcare_sessionData');
		 if(sessionData){		  
			  scope.clientId = sessionData.clientId;
			  RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
				  scope.clientData = data;
				  var paymentClientData = data || {};
				  var totalOrdersData = [];
				  localStorageService.add("storageData",{clientData:paymentClientData,totalOrdersData:totalOrdersData});
				  if(data.selfcare){
					  data.selfcare.token ? rootScope.iskortaTokenAvailable = true : rootScope.iskortaTokenAvailable = false;
				  }
				  if(data.selfcare){
					  if(!data.selfcare.authPin){
						  scope.clientData.selfcare.authPin = 'Not Available';
					  }
				  }
				  rootScope.selfcare_userName = data.displayName;
				  localStorageService.add('clientTotalData',data);
				  
				  RequestSender.statementResource.query({clientId: scope.clientId} , function(data) {	
					  totalStatementsData = data;
					  retrivingStatementsData.totalFilteredRecords = totalStatementsData.length;
					  scope.statementsData = paginatorService.paginate(scope.getStatementsData, 2);
					  
					  /*RequestSender.ticketResource.query({clientId: scope.clientId},function(data) {	        
						  totalTicketsData = data;
						  retrivingTicketsData.totalFilteredRecords = totalTicketsData.length;
						  scope.ticketsData = paginatorService.paginate(scope.getTicketsData, 2);
					  });*/
					//getting data from c_configuration for isRegister_plan and isisDeviceEnabled
	  					 var registrationListing = {};
	  					  RequestSender.configurationResource.get(function(data){
	  						var configType = angular.fromJson(data.clientConfiguration);
	  						if(configType) registrationListing	= configType.registrationListing;
	  						scope.isConfigNationalId 			= configType.nationalId;
	  						scope.isConfigPassport		= registrationListing.passport;
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
	           window.open(rootScope.hostUrl+ API_VERSION +'/billmaster/'+ statementId +'/print?tenantIdentifier=default');
	      };
		 
		
    };
    
selfcareApp.controller('ProfileController', ['$scope',
                                             'RequestSender',
                                             '$rootScope',
                                             'webStorage',
                                             '$location',
                                             'PaginatorService', 
                                             'localStorageService', 
                                             'API_VERSION', 
                                             ProfileController]);
