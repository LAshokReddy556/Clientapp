PaymentGatewayResponseController = function(scope,localStorageService) {
 
			scope.formData = {};
			
			var responseData = localStorageService.get("paymentgatewayresponse");
		     if(responseData){
		    	 scope.formData		 = responseData.data;
		    	 scope.cardType 	 = responseData.cardType || "";
		    	 scope.cardNumber 	 = responseData.cardNumber || "";
		    	 localStorageService.remove("paymentgatewayresponse");
		     }
        };
        
selfcareApp.controller('PaymentGatewayResponseController', [ '$scope','localStorageService',PaymentGatewayResponseController]);
