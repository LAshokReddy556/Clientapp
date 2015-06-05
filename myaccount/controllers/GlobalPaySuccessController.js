GlobalPaySuccessController = function(RequestSender, location,localStorageService) {
 
    		var formData			= {};
    		formData.transactionId 	= location.search().txnref;
    		formData.source 		= paymentGatewaySourceNames.globalpay;
    		var StorageData			= localStorageService.get("globalpayStorageData");
    		if(StorageData){
    			var screenName		= StorageData.screenName,
    			     clientId		= StorageData.clientId,
    				 planId			= StorageData.planId,
    			     priceId		= StorageData.priceId;
    		
	    		RequestSender.paymentGatewayResource.update(formData, function(data){
	    			localStorageService.remove("globalpayStorageData");
	    			localStorageService.add("paymentgatewayresponse", {data:data});
	    			var result = angular.uppercase(data.Result) || "";
	    			location.$$search = {};
	    			if(screenName == 'payment'){
						location.path('/paymentgatewayresponse/'+formData.clientId);
					}else if(result == 'SUCCESS' || result == 'PENDING'){
						if(result=='PENDING')localStorageService.add("gatewayStatus",result);
						location.path("/orderbookingscreen/"+screenName+"/"+clientId+"/"+planId+"/"+priceId);
					}
	    		});
    		}
    		
		};

selfcareApp.controller('GlobalPaySuccessController', ['RequestSender', 
	                                                  '$location', 
	                                                  'localStorageService', 
	                                                  GlobalPaySuccessController]);

