AddEventsController = function(scope,RequestSender,location,localStorageService,modal,rootScope) {
		  
		  scope.vodEventScreen 		= true;
		  scope.eventDetailsPreview = false;
		  var encrytionKey 			= selfcareModels.encriptionKey;
		  scope.isRedirecting 		= false;
		  
		//getting Payment Gateway names form constans.js
			var  kortaPG			=	paymentGatewayNames.korta || "";
			var  dalpayPG			=	paymentGatewayNames.dalpay || "";
			var  globalpayPG		=	paymentGatewayNames.globalpay || "";
			var  paypalPG			=	paymentGatewayNames.paypal || "";
			var  netellerPG			=	paymentGatewayNames.neteller || "";
			var  internalPaymentPG	=	paymentGatewayNames.internalPayment || "";
			var  two_checkoutPG		=	paymentGatewayNames.two_checkout || "";
			
			//getting locale value
			 scope.optlang 			= rootScope.localeLangCode;
		  
		  var clientData = {};
		  if(rootScope.selfcare_sessionData){
			  scope.clientId = rootScope.selfcare_sessionData.clientId;
			  RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
				  clientData = data;
				  scope.mediaDetails = [];
				  RequestSender.vodEventsResource.get({'filterType':'ALL','pageNo':0,clientType :clientData.categoryType},function(data){
					  scope.mediaDetails = data.mediaDetails;
				  });
			  });
		  }
		  scope.mediaDatas = [];scope.totalAmount = 0;
		  scope.selectedEventsFun = function(mediaData,active){
			  if(active == true){
				  scope.totalAmount += mediaData.price;
				  scope.mediaDatas.push(mediaData);
			  }
			  else{
				  scope.totalAmount -=mediaData.price;
				  for(var i in scope.mediaDatas){
					  if(scope.mediaDatas[i].mediaId == mediaData.mediaId && scope.mediaDatas[i].quality == mediaData.quality &&
                      	   scope.mediaDatas[i].optType == mediaData.optType && scope.mediaDatas[i].price == mediaData.price &&
                      	   scope.mediaDatas[i].eventId == mediaData.eventId && scope.mediaDatas[i].mediaTitle == mediaData.mediaTitle){
						  scope.mediaDatas.splice(i,1);
					  }
				  }
			  }
		  };
	      
	  function pgFun (){
	      if(rootScope.selfcare_sessionData){
			  scope.paymentgatewayDatas = [];
			  RequestSender.paymentGatewayConfigResource.get(function(data) {
				  if(data.globalConfiguration){
					  for(var i in data.globalConfiguration){
						   if(data.globalConfiguration[i].enabled && data.globalConfiguration[i].name != 'is-paypal-for-ios'  
							   && data.globalConfiguration[i].name != 'is-paypal'){
							   scope.paymentgatewayDatas.push(data.globalConfiguration[i]);
						   }
					  }
					 scope.paymentGatewayName = scope.paymentgatewayDatas.length>=1 ?scope.paymentgatewayDatas[0].name :"";
					 scope.paymentGatewayFun(scope.paymentGatewayName);
				  }
			  });
			}
	  }
	  
	  scope.checkOutFun = function(){
		  
		  if(scope.mediaDatas.length != 0){
			  scope.vodEventScreen = false;
			  scope.eventDetailsPreview = true;
			  pgFun();
			    
		  }
	  };
		  
	  var hostName = selfcareModels.selfcareAppUrl;
		   scope.paymentGatewayFun  = function(paymentGatewayName){
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
					  	"&cust_address1="+clientData.addressNo+"&cust_zip="+clientData.zip+"&cust_city="+clientData.state+"&item1_desc=AddingEvents&item1_price="+scope.totalAmount+"" + 	  				
					  	"&user1="+scope.clientId+"&user2="+hostName+"&user3=orderbookingscreen/vod"+scope.clientId+"/1/1";
						break;
						
				case kortaPG :
					localStorageService.add("eventData",scope.mediaDatas);
					var planData = {id:0,"price":scope.totalAmount,"planCode":"Adding Events"};
				    var kortaStorageData = {clientData :clientData,planId:0,planData : planData,screenName :"vod",paymentGatewayValues:paymentGatewayValues};	
				    var encodeURIComponentData = encodeURIComponent(JSON.stringify(kortaStorageData));
					var encryptedData = CryptoJS.AES.encrypt(encodeURIComponentData,encrytionKey).toString();
					
					var token = clientData.selfcare.token;		    		
					if(token != null && token != "") scope.paymentURL = "#/kortatokenintegration?key="+encryptedData;		    		 
					else scope.paymentURL = "#/kortaintegration?key="+encryptedData;	    		
					break;
						
				case paypalPG :
					var mediaData = [];
					for(var i in scope.mediaDatas){
						mediaData.push({"eventId":scope.mediaDatas[i].eventId},{"formatType":scope.mediaDatas[i].quality},{"optType":scope.mediaDatas[i].optType});
					}
					var query = {clientId :scope.clientId,eventData:mediaData,
							deviceId : clientData.hwSerialNumber,returnUrl:hostName, screenName:"vod"};
				
					scope.paymentURL = paymentGatewayValues.paypalUrl+'='+paymentGatewayValues.paypalEmailId+"&item_name=addingevents&amount="+scope.totalAmount+"" +	  	  				
					  	  "&custom="+JSON.stringify(query);
						break;
						
				case globalpayPG :
					
					var globalpayStorageData = {clientData :clientData,planId:0,screenName :"vod",price :scope.totalAmount,
												 priceId : 0, globalpayMerchantId:paymentGatewayValues.merchantId};	
				    var encodeURIComponentData = encodeURIComponent(JSON.stringify(globalpayStorageData));
					var encryptedData = CryptoJS.AES.encrypt(encodeURIComponentData,encrytionKey).toString();
					
					scope.paymentURL = "#/globalpayintegration?key="+encryptedData;
					break;
				case netellerPG :
					localStorageService.add("eventData",scope.mediaDatas);
					var nettellerData = {currency:selfcareModels.netellerCurrencyType,total_amount:scope.totalAmount,screenName:'vod'};
					var encodeURINetellerData = encodeURIComponent(JSON.stringify(nettellerData));
					var encryptedData = CryptoJS.AES.encrypt(encodeURINetellerData,encrytionKey).toString();
					scope.paymentURL = "#/neteller/"+scope.clientId+"?key="+encryptedData;
					break;
					
				case internalPaymentPG :
					scope.paymentURL =  "#/internalpayment/vod/"+scope.clientId+"/0/0/"+scope.totalAmount;
					break;
					
				case two_checkoutPG :
					localStorageService.add("twoCheckoutStorageData",{screenName:"vod",clientId:scope.clientId,
																		planId:0,priceId:0});
					localStorageService.add("eventData",scope.mediaDatas);
					var zipCode = clientData.zip || clientData.city || "";
					scope.paymentURL =  "https://sandbox.2checkout.com/checkout/purchase?sid="+paymentGatewayValues+"&mode=2CO&li_0_type=product&li_0_name=invoice&li_0_price="+scope.totalAmount
										+"&card_holder_name="+clientData.displayName+"&street_address="+clientData.addressNo+"&city="+clientData.city+"&state="+clientData.state+"&zip="+zipCode
										+"&country="+clientData.country+"&email="+clientData.email+"&quantity=1";
					
					break;
					
				default :
							break;
				}
			    	  		 	
			  };
			  
		   scope.subscribeBtnFun =function(){
			   localStorageService.add("eventData",scope.mediaDatas);
			   location.path("/orderbookingscreen/vod/"+scope.clientId+"/0/amountZero");
		    };
	    
		  scope.cancelBtnFun = function(){
			  scope.vodEventScreen = true;
			  scope.eventDetailsPreview = false;
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
		  
    };
    
selfcareApp.controller('AddEventsController', ['$scope',
                                               'RequestSender',
                                               '$location',
                                               'localStorageService',
                                               '$modal',
                                               '$rootScope',
                                               AddEventsController]);
