PaypalRedirectionController = function(scope,RequestSender, location,localStorageService,routeParams,dateFilter,rootScope) {
 
    		var N_PaypalData				= localStorageService.get("N_PaypalData")||"";
    		
    		var formData 					= {};
    		formData.transactionId 			= location.search().txnId;
    		formData.total_amount 			= location.search().amnt;
    		formData.currency 				= location.search().currency;
    		if(angular.lowercase(location.search().payStatus) == 'completed')
    			formData.status		 		= 'success';
    		else formData.status		 	= location.search().payStatus;
    		formData.source 				= paymentGatewaySourceNames.paypal;
    		formData.clientId 				= N_PaypalData.clientId;
    		formData.locale 				= rootScope.localeLangCode;
    		formData.dateFormat 			= 'dd MMMM yyyy';
    		formData.otherData 				= {};
    		formData.otherData.paymentDate 	= dateFilter(new Date(location.search().payDate),'dd MMMM yyyy');
    		formData.otherData.payerEmail 	= location.search().pyrEmail;
    		formData.otherData.address_name = location.search().name;
    		formData.otherData.receiverEmail= location.search().recvEmail;
    		formData.otherData.payerStatus 	= location.search().pyrStatus;
    		formData.otherData.currency 	= formData.currency;
    		formData.otherData.paymentStatus= formData.status;
    		formData.otherData.pendingReason= location.search().pendingReason;
    		
    		
    		var screenName					= N_PaypalData.screenName;
    		var planId						= N_PaypalData.planId;
    		var priceId						= N_PaypalData.priceId;
    	
    	 if(N_PaypalData != ""){
    		RequestSender.paymentGatewayResource.update({},formData,function(data){
    			  
				  localStorageService.add("paymentgatewayresponse", {data:data});
				  var result = angular.uppercase(data.Result) || "";
	    			location.$$search = {};localStorageService.remove("N_PaypalData");
	    			if(screenName == 'payment'){
						location.path('/paymentgatewayresponse/'+formData.clientId);
					}else if(result == 'SUCCESS' || result == 'PENDING'){
						localStorageService.add("gatewayStatus",formData.status);
					  if(screenName != 'vod'){
						var storageData = localStorageService.get("storageData")||{};
						var orderId 	= storageData.orderId || 0;
						RequestSender.getRecurringScbcriberIdResource.get({orderId:orderId},function(data){
							scope.recurringData = angular.fromJson(angular.toJson(data));
							scope.scbcriberId 	= scope.recurringData.subscriberId;
							console.log("scope.scbcriberId-->"+scope.scbcriberId);
							if(scope.scbcriberId){
								var recurringOrderData = {orderId:orderId,recurringStatus:"CANCEL",subscr_id:scope.scbcriberId};
								RequestSender.orderDisconnectByScbcriberIdResource.update({},recurringOrderData,function(data){
									
									location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
								});
							}else{
								location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
							}
						});
					  }else if(screenName == 'vod'){
						  location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
					  }
						
					}
			  });
    	  }
    		
		};

selfcareApp.controller('PaypalRedirectionController', ['$scope',
                                                       'RequestSender', 
	                                                  '$location', 
	                                                  'localStorageService', 
	                                                  '$routeParams', 
	                                                  'dateFilter', 
	                                                  '$rootScope', 
	                                                  PaypalRedirectionController]);

