PaypalRedirectionController = function(scope,RequestSender, location,localStorageService,routeParams,dateFilter) {
 
    		var formData 					= {};
    		var N_PaypalData				= localStorageService.get("N_PaypalData")||"";
    		
    		formData.transactionId 			= location.search().txnId;
    		formData.total_amount 			= location.search().amnt;
    		formData.currency 				= location.search().currency;
    		if(angular.lowercase(location.search().payStatus) == 'completed')
    			formData.status		 		= 'success';
    		else formData.status		 	= location.search().payStatus;
    		formData.source 				= 'paypal';
    		formData.clientId 				= N_PaypalData.clientId;
    		formData.locale 				= 'en';
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
    		
    		RequestSender.paymentGatewayResource.update({},formData,function(data){
    			//  localStorageService.remove("N_PaypalData");
    			  localStorageService.remove("chargeCodeData");
    			  
				  localStorageService.add("paymentgatewayresponse", {data:data});
				  var result = angular.uppercase(data.Result) || "";
	    			location.$$search = {};
	    			if(screenName == 'payment'){
						location.path('/paymentgatewayresponse/'+formData.clientId);
					}else if(result == 'SUCCESS' || result == 'PENDING'){
						if(angular.lowercase(formData.status) == 'pending')localStorageService.add("gatewayStatus",formData.status);
						var recurringData = localStorageService.get("recurringData")||{};
						localStorageService.remove("recurringData");
						console.log(recurringData);
						if(recurringData.length != 0){
							scope.scbcriberId = recurringData.subscriberId;
							scope.orderId = recurringData.orderId;
						}
						console.log("scope.scbcriberId-->"+scope.scbcriberId);
						
						if(scope.scbcriberId){
							var recurringOrderData = {orderId:scope.orderId,recurringStatus:"CANCEL",subscr_id:scope.scbcriberId};
							RequestSender.orderDisconnectByScbcriberIdResource.update({},recurringOrderData,function(data){
								
								location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
							});
						}else{
							location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
						}
						
					}
			  });
    		
		};

selfcareApp.controller('PaypalRedirectionController', ['$scope',
                                                       'RequestSender', 
	                                                  '$location', 
	                                                  'localStorageService', 
	                                                  '$routeParams', 
	                                                  'dateFilter', 
	                                                  PaypalRedirectionController]);

