PaymentProcessController = function(scope,routeParams,RequestSender,localStorageService,location,modal){
	
	scope.screenName 		= routeParams.screenName;
	var planId 				= routeParams.planId;
	var priceDataId 		= routeParams.priceId;
	scope.price		 	 	= routeParams.price;
	var encrytionKey 		= selfcareModels.encriptionKey;
	scope.isRedirecting 	= false;
	
	//getting Payment Gateway names form constans.js
	var  kortaPG			=	paymentGatewayNames.korta || "";
	var  dalpayPG			=	paymentGatewayNames.dalpay || "";
	var  globalpayPG		=	paymentGatewayNames.globalpay || "";
	var  paypalPG			=	paymentGatewayNames.paypal || "";
	var  netellerPG			=	paymentGatewayNames.neteller || "";
	var  internalPaymentPG	=	paymentGatewayNames.internalPayment || "";
	var  two_checkoutPG		=	paymentGatewayNames.two_checkout || "";
	
	//getting locale value
	 var temp 				= localStorageService.get('localeLang')||"";
	 scope.optlang 			= temp || selfcareModels.locale;
	
	var storageData			= localStorageService.get("storageData") ||"";
	var clientData 			= storageData.clientData;
	var totalOrdersData		= storageData.totalOrdersData;
	var orderId				= storageData.orderId || 0;
	scope.clientId			= clientData.id;
	var chargeCodeData 		= localStorageService.get("chargeCodeData")||"";
	var isAutoRenew 		= localStorageService.get("isAutoRenew") || "";
	
		for(var i in totalOrdersData){
			if(totalOrdersData[i].planId == planId){
				for(var j in totalOrdersData[i].pricingData){
					if(totalOrdersData[i].pricingData[j].id == priceDataId){
						scope.planData = totalOrdersData[i].pricingData[j] || {};
						break;
					}
				}
			  break;
			}
		}
		
		if(clientData){
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
	
	var hostName = selfcareModels.selfcareAppUrl;
	
	   scope.paymentGatewayFun  = function(paymentGatewayName){
		   localStorageService.remove("N_PaypalData");
		   scope.paymentGatewayName = paymentGatewayName;
			  scope.termsAndConditions = false;
			  var paymentGatewayValues = {};
			  for (var i in scope.paymentgatewayDatas){
			    if(scope.paymentgatewayDatas[i].name==paymentGatewayName && scope.paymentgatewayDatas[i].name !='internalPayment'){
				  paymentGatewayValues =  JSON.parse(scope.paymentgatewayDatas[i].value);
				  break;
			    }
				  
			  }
	     switch(paymentGatewayName){
	     
			case dalpayPG :
					var url = paymentGatewayValues.url+'?mer_id='+paymentGatewayValues.merchantId+'&pageid='+paymentGatewayValues.pageId+'&item1_qty=1&num_items=1';
				scope.paymentURL =  url+"&cust_name="+clientData.displayName+"&cust_phone="+clientData.phone+"&cust_email="+clientData.email+"&cust_state="+clientData.state+""+				
				  	"&cust_address1="+clientData.addressNo+"&cust_zip="+clientData.zip+"&cust_city="+clientData.state+"&item1_desc="+scope.planData.planCode+"&item1_price="+scope.planData.price+"" + 	  				
				  	"&user1="+scope.clientId+"&user2="+hostName+"&user3=orderbookingscreen/"+scope.screenName+"/"+scope.clientId+"/"+planId+"/"+priceDataId;
					break;
					
			case kortaPG :
				
			    var kortaStorageData = {clientData :clientData,planId:planId,planData : scope.planData,screenName :scope.screenName,paymentGatewayValues:paymentGatewayValues};	
			    var encodeURIComponentData = encodeURIComponent(JSON.stringify(kortaStorageData));
				var encryptedData = CryptoJS.AES.encrypt(encodeURIComponentData,encrytionKey).toString();
				
				var token = clientData.selfcare.token;		    		
				if(token != null && token != "") scope.paymentURL = "#/kortatokenintegration?key="+encryptedData;		    		 
				else scope.paymentURL = "#/kortaintegration?key="+encryptedData;	    		
				break;
					
			case paypalPG :
				RequestSender.getRecurringScbcriberIdResource.get({orderId:orderId},function(data){
					console.log(angular.fromJson(angular.toJson(data)));
					localStorageService.add("recurringData",angular.fromJson(angular.toJson(data)));
				});
				if(angular.fromJson(isAutoRenew)){
						var chargeCodeData1	= chargeCodeData.data;
						var srt 		= srtCountCheckingFun(chargeCodeData1);
						 /*if(srt<=1){
							scope.errorRecurring = "error.msg.paypal.recurring.notpossible"; 
						 }else*/
							 scope.paymentURL = "#/paypalrecurring/"+scope.screenName+"/"+scope.clientId+"/"+planId+"/"+priceDataId+"/"+scope.price+"/"+paymentGatewayValues.paypalEmailId+"/"+scope.planData.contractId;
				}else{
					
						/*var query = {clientId :scope.clientId,planId: planId,screenName:scope.screenName,priceDataId:priceDataId};*/
						var query = hostName;
						localStorageService.add("N_PaypalData",{clientId:scope.clientId,screenName :scope.screenName,planId: planId,priceId:priceDataId});
						scope.paymentURL = paymentGatewayValues.paypalUrl+'='+paymentGatewayValues.paypalEmailId+"&item_name="+scope.planData.planCode+"&amount="+scope.planData.price+"" +	  	  				
						  	  "&custom="+query;
				}
				break;
					
			case globalpayPG :
				
				var globalpayStorageData = {clientData :clientData,planId:planId,screenName :scope.screenName,price :scope.price,
											 priceId : priceDataId, globalpayMerchantId:paymentGatewayValues.merchantId};	
			    var encodeURIComponentData = encodeURIComponent(JSON.stringify(globalpayStorageData));
				var encryptedData = CryptoJS.AES.encrypt(encodeURIComponentData,encrytionKey).toString();
				
				scope.paymentURL = "#/globalpayintegration?key="+encryptedData;
				break;
			case netellerPG :
				
				var nettellerData = {currency:selfcareModels.netellerCurrencyType,total_amount:scope.price,
									paytermCode:scope.planData.billingFrequency,planCode : planId,
									contractPeriod : scope.planData.contractId,screenName:scope.screenName,orderId : orderId};
				
				var encodeURINetellerData = encodeURIComponent(JSON.stringify(nettellerData));
				var encryptedData = CryptoJS.AES.encrypt(encodeURINetellerData,encrytionKey).toString();
				scope.paymentURL = "#/neteller/"+scope.clientId+"?key="+encryptedData;
				break;
				
			case internalPaymentPG :
				scope.paymentURL =  "#/internalpayment/"+scope.screenName+"/"+scope.clientId+"/"+planId+"/"+priceDataId+"/"+scope.price;
				break;
				
			case two_checkoutPG :
				localStorageService.add("twoCheckoutStorageData",{screenName:scope.screenName,clientId:scope.clientId,
																 	planId:planId,priceId:priceDataId});
				var zipCode = clientData.zip || clientData.city || "";
				scope.paymentURL =  "https://sandbox.2checkout.com/checkout/purchase?sid="+paymentGatewayValues+"&mode=2CO&li_0_type=product&li_0_name=invoice&li_0_price="+scope.planData.price
									+"&card_holder_name="+clientData.displayName+"&street_address="+clientData.addressNo+"&city="+clientData.city+"&state="+clientData.state+"&zip="+zipCode
									+"&country="+clientData.country+"&email="+clientData.email+"&quantity=1";
				
				break;
				
			default :
						break;
			}
		    	  		 	
		  };
		  
	scope.finishBtnFun =function(){
  	  		  location.path("/orderbookingscreen/"+scope.screenName+"/"+scope.clientId+"/"+planId+"/"+priceDataId);
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
    			$scope.termsAndConditionsText = two_checkout[termsAndConditions]	: $scope.termsAndConditionsText = selectOnePaymentGatewayText[scope.optlang];
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
    	var contractType = 0;
		var durationType = 0;
		console.log("contractType**************>"+angular.lowercase(chargeCodeData.contractType));
		console.log("durationType**************>"+angular.lowercase(chargeCodeData.durationType));
    			switch (angular.lowercase(chargeCodeData.contractType)) {
							case "month(s)":
								contractType = 30;
								break;
							case "day(s)":
								contractType = 1;
								break;
							case "week(s)":
								contractType = 7;
								break;
							case "year(s)":
								contractType = 365;
								break;
							default:
								break;
					};
				switch (angular.lowercase(chargeCodeData.durationType)) {
							case "month(s)":
								durationType = 30;
								break;
							case "day(s)":
								durationType = 1;
								break;
							case "week(s)":
								durationType = 7;
								break;
							case "year(s)":
								durationType = 365;
								break;
							default:
								break;
						};
						console.log("contractType-->"+contractType);
						console.log("units-->"+chargeCodeData.units);
						console.log("durationType-->"+durationType);
						console.log("chargeDuration-->"+chargeCodeData.chargeDuration);
				/*var srt =  Math.round(billFrequencyCode/(durationType*chargeCodeData.chargeDuration));*/
				  var srt = (chargeCodeData.units * contractType) / (durationType * chargeCodeData.chargeDuration);
				return srt;
    }
    
};

selfcareApp.controller("PaymentProcessController",['$scope',
                                                   '$routeParams',
                                                   'RequestSender',
                                                   'localStorageService',
                                                   '$location',
                                                   '$modal',
                                                   PaymentProcessController]);