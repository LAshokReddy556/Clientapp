TicketsController = function(scope,RequestSender,rootScope) {
		  
		  if(rootScope.selfcare_sessionData){
			  scope.clientId = rootScope.selfcare_sessionData.clientId;
			  scope.ticketsData = [];
			  RequestSender.ticketResource.query({clientId: scope.clientId},function(data) {	        
				  scope.ticketsData = data;
			  });
		  }
    };
    
selfcareApp.controller('TicketsController', ['$scope',
                                             'RequestSender',
                                             '$rootScope',
                                             TicketsController]);
