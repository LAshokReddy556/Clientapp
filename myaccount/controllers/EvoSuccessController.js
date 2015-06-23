EvoSuccessController = function(scope,RequestSender, location,localStorageService,rootScope) {
 
    		//values getting form constants.js file
  		    scope.blowfishKey    	= selfcareModels.EVO_Blowfish;
  		    scope.currencyType		= selfcareModels.EVO_CurrencyType;
  		    scope.optlang 			= rootScope.localeLangCode;
  		    
    		var length				= location.search().Len;
    		var data				= location.search().Data;
    		var output				= "";
    		var blowfishDecData		= {text:data,length:length};
    		RequestSender.evoPaymentGatewayResource.save({method:'decrypt'},blowfishDecData,function(data){
    			output = data.map.blowfishData;
    			console.log(length);
    			console.log(output.length); 
    			var splitAmpersand = output.split('&'); 
    			var outputObj = {};
    			for(var i in splitAmpersand){
    				var splitEqual = splitAmpersand[i].split('=');
    				outputObj[splitEqual[0]] = splitEqual[1];
    			}
    			
    			var decryptedData 		= CryptoJS.AES.decrypt(outputObj.UserData, selfcareModels.encriptionKey).toString(CryptoJS.enc.Utf8),
    				evoStorageData 		= angular.fromJson(decodeURIComponent(decryptedData)),
    				clientId 			= evoStorageData.clientId,
    				email 				= evoStorageData.email,
    				price 				= evoStorageData.price,
    				planId 				= evoStorageData.planId,
    				priceId 			= evoStorageData.priceId,
    				screenName 			= evoStorageData.screenName;
    			var formData = {};
    			formData.total_amount = price;
    			formData.transactionId = outputObj.refnr;
    			formData.source = paymentGatewaySourceNames.evo;
    			formData.otherData  = {};
    			formData.otherData  = outputObj;
    			delete formData.otherData.UserData;
    			formData.locale = scope.optlang;
    			formData.emailId = email;
    			//formData.device = "";
    			formData.currency = scope.currencyType;
    			formData.clientId = clientId;
    			
    			var cardNumber = "XXXX-XXXX-XXXX-X"+outputObj.PCNr.toString().substring(13, 16);
    			var cardType = outputObj.CCBrand;
    			if(angular.uppercase(outputObj.Status) == 'AUTHORIZED' || angular.uppercase(outputObj.Status) == 'OK' && outputObj.Code == 00000000){
    			  RequestSender.paymentGatewayResource.update({},formData,function(data){
					  localStorageService.add("paymentgatewayresponse", {data:data,cardType:cardType,cardNumber:cardNumber});
					  var result = angular.uppercase(data.Result);
		    		  location.$$search = {};
		    		 if(screenName == 'payment'){
							location.path('/paymentgatewayresponse/'+clientId);
					 }else if(result == 'SUCCESS' || result == 'PENDING'){
						localStorageService.add("gatewayStatus",result);
						location.path("/orderbookingscreen/"+screenName+"/"+clientId+"/"+planId+"/"+priceId);
					 }
				  });
    			}else{
    				alert("Status Failed :"+outputObj.Description);
    			}
    		 });
		};

selfcareApp.controller('EvoSuccessController', ['$scope',
                                                'RequestSender', 
	                                            '$location', 
	                                            'localStorageService', 
	                                            '$rootScope', 
	                                            EvoSuccessController]);

