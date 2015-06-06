PaymentProcessController = function(scope,routeParams,RequestSender,localStorageService,location,modal,rootScope){
	
	scope.screenName 		= routeParams.screenName;
	scope.planId 			= routeParams.planId;
	scope.priceId	 		= routeParams.priceId;
	scope.price		 	 	= routeParams.price;
	var encrytionKey 		= selfcareModels.encriptionKey;
	scope.isRedirecting 	= false;
	
	//getting Payment Gateway names form constans.js
	var  kortaPG			=	paymentGatewayNames.korta || "",
		 dalpayPG			=	paymentGatewayNames.dalpay || "",
	     globalpayPG		=	paymentGatewayNames.globalpay || "",
		 paypalPG			=	paymentGatewayNames.paypal || "",
		 netellerPG			=	paymentGatewayNames.neteller || "",
		 internalPaymentPG	=	paymentGatewayNames.internalPayment || "",
		 two_checkoutPG		=	paymentGatewayNames.two_checkout || "",
		 evoPG				=	paymentGatewayNames.evo || "";
	
	//getting locale value
	 scope.optlang 			= rootScope.localeLangCode;
	
	var storageData			= localStorageService.get("storageData") ||"";
	var clientData 			= storageData.clientData;
	var totalOrdersData		= storageData.totalOrdersData;
	var orderId				= storageData.orderId || 0;
	scope.clientId			= clientData.id;
	var chargeCodeData 		= localStorageService.get("chargeCodeData")||"";
	var isAutoRenew 		= localStorageService.get("isAutoRenew") || "";
	
		for(var i in totalOrdersData){
			if(totalOrdersData[i].planId == scope.planId){
				for(var j in totalOrdersData[i].pricingData){
					if(totalOrdersData[i].pricingData[j].id == scope.priceId){
						scope.planData = totalOrdersData[i].pricingData[j] || {};
						break;
					}
				}
			  break;
			}
		}
		
	   if(clientData){
		 if(scope.price != 0){
		  scope.paymentgatewayDatas = [];
		   RequestSender.paymentGatewayConfigResource.get(function(data) {
			  if(data.globalConfiguration){
				  for(var i in data.globalConfiguration){
					   if(data.globalConfiguration[i].enabled && data.globalConfiguration[i].name != 'is-paypal-for-ios'  
						   && data.globalConfiguration[i].name != 'is-paypal'&& data.globalConfiguration[i].name != 'paypal-recurring-payment-details'){
						   scope.paymentgatewayDatas.push(data.globalConfiguration[i]);
					   }
				  }
				 scope.paymentGatewayName = scope.paymentgatewayDatas.length>=1 ?scope.paymentgatewayDatas[0].name :"";
				 scope.paymentGatewayFun(scope.paymentGatewayName);
			  }
		   });
		 }
		}
	
	var hostName = selfcareModels.selfcareAppUrl;
	
	   scope.paymentGatewayFun  = function(paymentGatewayName){
		   localStorageService.remove("N_PaypalData");
		   localStorageService.remove("recurringData");
		   scope.errorRecurring = "";
		   scope.paymentGatewayName = paymentGatewayName;
			  scope.termsAndConditions = false;
			  var paymentGatewayValues = {};
			  for (var i in scope.paymentgatewayDatas){
			    if(scope.paymentgatewayDatas[i].name==paymentGatewayName && scope.paymentgatewayDatas[i].name !='internalPayment'){
				  paymentGatewayValues =  angular.fromJson(scope.paymentgatewayDatas[i].value);
				  break;
			    }
				  
			  }
	     switch(paymentGatewayName){
	     
			case dalpayPG :
					var url = paymentGatewayValues.url+'?mer_id='+paymentGatewayValues.merchantId+'&pageid='+paymentGatewayValues.pageId+'&item1_qty=1&num_items=1';
				scope.paymentURL =  url+"&cust_name="+clientData.displayName+"&cust_phone="+clientData.phone+"&cust_email="+clientData.email+"&cust_state="+clientData.state+""+				
				  	"&cust_address1="+clientData.addressNo+"&cust_zip="+clientData.zip+"&cust_city="+clientData.state+"&item1_desc="+scope.planData.planCode+"&item1_price="+scope.price+"" + 	  				
				  	"&user1="+scope.clientId+"&user2="+hostName+"&user3=orderbookingscreen/"+scope.screenName+"/"+scope.clientId+"/"+scope.planId+"/"+scope.priceId;
					break;
					
			case kortaPG :
				
			    var kortaStorageData = {clientData :clientData,planId:scope.planId,planData : scope.planData,screenName :scope.screenName,paymentGatewayValues:paymentGatewayValues};	
				var encryptedData = CryptoJS.AES.encrypt(encodeURIComponent(angular.toJson(kortaStorageData)),encrytionKey).toString();
				
				if(clientData.selfcare.token != null && clientData.selfcare.token != "")
					scope.paymentURL = "#/kortatokenintegration/"+scope.price+"?key="+encryptedData;		    		 
				else scope.paymentURL = "#/kortaintegration/"+scope.price+"?key="+encryptedData;	    		
				break;
					
			case paypalPG :
				if(angular.fromJson(isAutoRenew)){
						 if(srtCountCheckingFun(chargeCodeData.data)<=1) 
							 scope.errorRecurring = "error.msg.paypal.recurring.notpossible"; 
						 else{
						   var paypalStorageData = {screenName:scope.screenName,clientId:scope.clientId,planId:scope.planId,priceId:scope.priceId,
								   	price:scope.price,paypalEmailId:paymentGatewayValues.paypalEmailId,contractId:scope.planData.contractId,
								   	chargeCodeData : chargeCodeData};
						   var encryptedData = CryptoJS.AES.encrypt(encodeURIComponent(angular.toJson(paypalStorageData)),encrytionKey).toString();
							 scope.paymentURL = "#/paypalrecurring?key="+encryptedData;
						 }
				}else{
					
						/*var query = {clientId :scope.clientId,planId: planId,screenName:scope.screenName,priceDataId:scope.priceId};*/
						localStorageService.add("N_PaypalData",{clientId:scope.clientId,screenName :scope.screenName,planId: scope.planId,priceId:scope.priceId});
						scope.paymentURL = paymentGatewayValues.paypalUrl+'='+paymentGatewayValues.paypalEmailId+"&item_name="+scope.planData.planCode+"&amount="+scope.price+"" +	  	  				
						  	  "&custom="+hostName;
				}
				break;
					
			case globalpayPG :
				
				var globalpayStorageData = {clientData :clientData,planId:scope.planId,screenName :scope.screenName,price :scope.price,
											 priceId : scope.priceId, globalpayMerchantId:paymentGatewayValues.merchantId};	
				var encryptedData = CryptoJS.AES.encrypt(encodeURIComponent(angular.toJson(globalpayStorageData)),encrytionKey).toString();
				
				scope.paymentURL = "#/globalpayintegration?key="+encryptedData;
				break;
			case netellerPG :
				
				var nettellerData = {currency:selfcareModels.netellerCurrencyType,total_amount:scope.price,
									paytermCode:scope.planData.billingFrequency,planCode : scope.planId,
									contractPeriod : scope.planData.contractId,screenName:scope.screenName};
				var encryptedData = CryptoJS.AES.encrypt(encodeURIComponent(angular.toJson(nettellerData)),encrytionKey).toString();
				
				scope.paymentURL = "#/neteller/"+scope.clientId+"?key="+encryptedData;
				break;
				
			case internalPaymentPG :
				scope.paymentURL =  "#/internalpayment/"+scope.screenName+"/"+scope.clientId+"/"+scope.planId+"/"+scope.priceId+"/"+scope.price;
				break;
				
			case two_checkoutPG :
				localStorageService.add("twoCheckoutStorageData",{screenName:scope.screenName,clientId:scope.clientId,
																 	planId:scope.planId,priceId:scope.priceId});
				var zipCode = clientData.zip || clientData.city || "";
				scope.paymentURL =  "https://sandbox.2checkout.com/checkout/purchase?sid="+paymentGatewayValues+"&mode=2CO&li_0_type=product&li_0_name=invoice&li_0_price="+scope.price
									+"&card_holder_name="+clientData.displayName+"&street_address="+clientData.addressNo+"&city="+clientData.city+"&state="+clientData.state+"&zip="+zipCode
									+"&country="+clientData.country+"&email="+clientData.email+"&quantity=1";
				
				break;
			
			case evoPG :
				var evoData = {screenName:scope.screenName,planId:scope.planId,priceId:scope.priceId,price:scope.price,
								clientData:clientData,planData:scope.planData, merchantId: paymentGatewayValues.merchantId};
				var encryptedData = CryptoJS.AES.encrypt(encodeURIComponent(angular.toJson(evoData)),encrytionKey).toString();
				
				scope.paymentURL = "#/evointegration?key="+encryptedData;
				break;
				
			default : break;
			}
		    	  		 	
		  };
		  
    var TermsandConditionsController = function($scope,$modalInstance){
    	var termsAndConditions = "termsAndConditions_"+scope.optlang+"_locale";
    	if(scope.optlang){
    		(scope.paymentGatewayName == kortaPG)?
    			$scope.termsAndConditionsText = korta[termsAndConditions] 	 		: (scope.paymentGatewayName == dalpayPG)?
    			$scope.termsAndConditionsText = dalpay[termsAndConditions] 	 		: (scope.paymentGatewayName == globalpayPG)?
    			$scope.termsAndConditionsText = globalpay[termsAndConditions] 		: (scope.paymentGatewayName == paypalPG)?
    			$scope.termsAndConditionsText = paypal[termsAndConditions] 	 		: (scope.paymentGatewayName == netellerPG)?
    			$scope.termsAndConditionsText = neteller[termsAndConditions] 	 	: (scope.paymentGatewayName == internalPaymentPG)?
    			$scope.termsAndConditionsText = internalPayment[termsAndConditions] : (scope.paymentGatewayName == two_checkoutPG)?
    			$scope.termsAndConditionsText = two_checkout[termsAndConditions]	: (scope.paymentGatewayName == evoPG)?
    	    	$scope.termsAndConditionsText = evo[termsAndConditions]				: $scope.termsAndConditionsText = selectOnePaymentGatewayText[scope.optlang];
    	}
    	$scope.done = function(){
    		$modalInstance.dismiss('cancel');
    	};
    };
   
    scope.termsAndConditionsFun = function(){
		    modal.open({
				 templateUrl: 'termsandconditions.html',
				 controller: TermsandConditionsController,
				 resolve:{}
		    });
    };
    
    function srtCountCheckingFun(chargeCodeData){
    	var contractType = 0, chargeType = 0;
		console.log("contractType**************>"+angular.lowercase(chargeCodeData.contractType));
		console.log("chargeType**************>"+angular.lowercase(chargeCodeData.chargeType));
    			switch (angular.lowercase(chargeCodeData.contractType)) {
							case "month(s)"	: contractType = 30;
											  break;
							case "day(s)"	: contractType = 1;
											  break;
							case "week(s)"	: contractType = 7;
											  break;
							case "year(s)"	: contractType = 365;
											  break;
							default			: break;
					};
				switch (angular.lowercase(chargeCodeData.chargeType)) {
							case "month(s)"	: chargeType = 30;
							  break;
							case "day(s)"	: chargeType = 1;
											  break;
							case "week(s)"	: chargeType = 7;
											  break;
							case "year(s)"	: chargeType = 365;
											  break;
							default			: break;
						};
						console.log("contractType-->"+contractType);
						console.log("contractDuration-->"+chargeCodeData.contractDuration);
						console.log("chargeType-->"+chargeType);
						console.log("chargeDuration-->"+chargeCodeData.chargeDuration);
				return (chargeCodeData.contractDuration * contractType) / (chargeType * chargeCodeData.chargeDuration);
    }
    
};

selfcareApp.controller("PaymentProcessController",['$scope',
                                                   '$routeParams',
                                                   'RequestSender',
                                                   'localStorageService',
                                                   '$location',
                                                   '$modal',
                                                   '$rootScope',
                                                   PaymentProcessController]);