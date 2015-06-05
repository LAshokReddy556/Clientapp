KortaSuccessController = function(rootScope,RequestSender,location,localStorageService,routeParams) {
 
			//getting routeParams values
			var screenName 			= routeParams.screenName,
				planId 				= routeParams.planId,
				priceId 			= routeParams.priceId,
				secretCode 			= localStorageService.get("secretCode");
			
    		//values getting form constants.js file
    		var kortaServer 		= selfcareModels.kortaServer,
    			kortaAmountField 	= selfcareModels.kortaAmountField,
    			kortaclientId 		= selfcareModels.kortaclientId,
    			kortaPaymentMethod 	= selfcareModels.kortaPaymentMethod,
    			kortaTokenValue		= selfcareModels.kortaTokenValue,
    			encrytionKey 		= selfcareModels.encriptionKey;
    		 
    		var downloadmd5		 	= location.search().downloadmd5,         
    			reference 		  	= location.search().reference,      	
    			checkvaluemd5 	  	= location.search().checkvaluemd5,
    			cardbrand	 	  	= location.search().cardbrand,
    			card4 	  			= location.search().card4,
    			encryptedData     	= location.search().key;
    			
    		var formData = {};
        	var decryptedData     	= CryptoJS.AES.decrypt(encryptedData, encrytionKey).toString(CryptoJS.enc.Utf8);
        	var	kortaStorageData 	= angular.fromJson(decodeURIComponent(decryptedData));
        	formData.total_amount 	= kortaStorageData[kortaAmountField];
        	formData.clientId 		= kortaStorageData[kortaclientId];
        	formData.locale 		= kortaStorageData.locale;
        	formData.emailId 		= kortaStorageData.email;
        	formData.transactionId	= reference;
        	formData.source 		= paymentGatewaySourceNames.korta;	
        	formData.otherData 		= '{"paymentId":'+reference+'}';
       	 	formData.device 		= '';
       	 	formData.currency 		= selfcareModels.kortaCurrencyType;
       	 	formData.cardType 		= cardbrand;
       	 	formData.cardNumber 	= "XXXX-XXXX-XXXX-"+card4.toString();

        	var PaymentMethod 		= kortaStorageData[kortaPaymentMethod];
        	var kortaToken			= kortaStorageData[kortaTokenValue];
        	
        	var stringData = '';
        	kortaServer == 'TEST' ? stringData = 2 + checkvaluemd5+reference + secretCode + kortaServer :
	      	kortaServer == 'LIVE' ? stringData = 2+checkvaluemd5+reference+secretCode :
	      		(alert("Please Configure the Server Type Properly. Either 'TEST' or 'LIVE'"),stringData = '');
        	
        	var downloadmd5String = md5(stringData);
        	        	
        	if(downloadmd5String == downloadmd5){
	        	
        		if(PaymentMethod == selfcareModels.changeKortaTokenDoActionMsg){
        			localStorageService.remove("secretCode");
        			RequestSender.updateKortaToken.update({clientId : formData.clientId},{kortaToken: kortaToken},function(data){
        				location.$$search = {};
        				location.path('/profile');
        			});
        		}else if(PaymentMethod == selfcareModels.kortaDoActionMsg){
        				
    				RequestSender.updateKortaToken.update({clientId : formData.clientId},{kortaToken: kortaToken},function(data){
    				  RequestSender.paymentGatewayResource.update({},formData,function(data){
    					  localStorageService.add("paymentgatewayresponse", {data:data,cardType:formData.cardType,cardNumber:formData.cardNumber});
    					  rootScope.iskortaTokenAvailable = true;
    					  var result = angular.uppercase(data.Result);
    		    		  location.$$search = {};
    		    		  localStorageService.remove("secretCode");
						if(result == 'SUCCESS'){
							location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
						}else if(result == 'PENDING'){
							localStorageService.add("gatewayStatus",result);
								location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
						}else{	 
							location.path('/paymentgatewayresponse/'+formData.clientId);
						}
					  });     	  		
    				});
        			
        			
        		}else{
    				RequestSender.paymentGatewayResource.update({clientId : formData.clientId},formData,function(data){
    					  localStorageService.add("paymentgatewayresponse", {data:data,cardType:formData.cardType,cardNumber:formData.cardNumber});
    					  var result = angular.uppercase(data.Result);
  							location.$$search = {};
  							localStorageService.remove("secretCode");
  						if(result == 'SUCCESS'){
  							location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
  						}else if(result == 'PENDING'){
  							localStorageService.add("gatewayStatus",result);
  								location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
  						}else{	 
  							location.path('/paymentgatewayresponse/'+formData.clientId);
  						}
      				});
          		  }
        		
        	}else{
        		alert("calculate md5 String Value : "+ downloadmd5String+",downloadmd5 : "+ downloadmd5);
        		alert("Payment Failure md5 Strings are not comparing each other");
        	}
        	
        	        	
        };
        
selfcareApp.controller('KortaSuccessController', ['$rootScope',
                                                  'RequestSender', 
                                                  '$location', 
                                                  'localStorageService',
                                                  '$routeParams',
                                                  KortaSuccessController]);

