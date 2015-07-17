StatementsController = function(scope,RequestSender,location,API_VERSION,paginatorService,rootScope) {
		  
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
		  
		  scope.getPaymentsData = function(offset, limit, callback) {
			  RequestSender.paymentsResource.get({clientId: scope.clientId ,offset: offset, limit: limit,type:'PAYMENT'} , callback);
	  	   };
	  		
		  if(rootScope.selfcare_sessionData){
			  scope.clientId = rootScope.selfcare_sessionData.clientId;
			  RequestSender.statementResource.query({clientId: scope.clientId} , function(data) {	
                  totalStatementsData = data;
                  retrivingStatementsData.totalFilteredRecords = totalStatementsData.length;
				  scope.statementsData = paginatorService.paginate(scope.getStatementsData, 4);
                  
				  scope.paymentsData = [];
        	  	  scope.paymentsData = paginatorService.paginate(scope.getPaymentsData, 4);
               });
		  }
		  
		  scope.routeTostatement = function(statementid){
	             location.path('/viewstatement/'+statementid);
	      };
	      scope.downloadFile = function (statementId){
	           window.open(API_VERSION +'/billmaster/'+ statementId +'/print?tenantIdentifier='+selfcareModels.tenantId);
	      };
          
    };
    
selfcareApp.controller('StatementsController', ['$scope',
                                                'RequestSender',
                                                '$location',
                                                'API_VERSION', 
                                                'PaginatorService', 
                                                '$rootScope', 
                                                StatementsController]);
