OrderBookingScreenController = function(RequestSender,rootScope,location,dateFilter,routeParams, localStorageService) {
		  
	//values getting form routeParams 
	var screenName			= routeParams.screenName;
	var clientId			= routeParams.clientId; 
	var planId				= routeParams.planId; 
	var priceId				= routeParams.priceId; 
	var orderBookingData 	= {};
	var gatewayStatus		= localStorageService.get("gatewayStatus")||"";
	var isAutoRenew 		= localStorageService.get("isAutoRenew") || "";
	alert(isAutoRenew);
	
	function successFun(planData){
    	localStorageService.remove("secretCode");localStorageService.remove("storageData");
    	localStorageService.remove("isAutoRenew");
    	if(screenName != "vod"){
    		(planData.price==0) ? location.path("/services") : location.path('/paymentgatewayresponse/'+clientId);
    	}
    	else if (screenName == "vod"){
    		localStorageService.remove("eventData");
    		(priceId == "amountZero")? location.path("/services") : location.path('/paymentgatewayresponse/'+clientId);
    	};
    }
	
  RequestSender.clientResource.get({clientId: clientId} , function(data) {
		  var clientData = data;
    if(screenName != "vod"){
	 RequestSender.orderTemplateResource.query({region : clientData.state},function(data){
			var totalOrdersData = data;
		for(var i in totalOrdersData){
		  if(totalOrdersData[i].planId == planId){
			for(var j in totalOrdersData[i].pricingData){
			  if(totalOrdersData[i].pricingData[j].id == priceId){
				var planData = totalOrdersData[i].pricingData[j];
				if(screenName == "additionalorders"){
					orderBookingData.billAlign 		= false;
					orderBookingData.isNewplan 		= true;
					orderBookingData.locale 		= rootScope.localeLangCode; 
					orderBookingData.dateFormat 	= 'dd MMMM yyyy'; 
					var reqDate 					= dateFilter(new Date(),'dd MMMM yyyy');
					orderBookingData.start_date 	= reqDate; 
					orderBookingData.paytermCode 	= planData.billingFrequency; 
					orderBookingData.contractPeriod = planData.contractId; 
					orderBookingData.planCode 		= planId;
					orderBookingData.autoRenew 		= isAutoRenew;
					if(gatewayStatus == "PENDING"){
						orderBookingData.status 	= gatewayStatus;
						orderBookingData.actionType	= screenName;
						RequestSender.scheduleOrderResource.save({clientId : clientId},orderBookingData,function(data){
							localStorageService.remove("gatewayStatus");
							successFun(planData);
						});
					}
					else if(gatewayStatus == "RECURRING"){
						orderBookingData.status 	= gatewayStatus;
						orderBookingData.actionType	= screenName;
						RequestSender.scheduleOrderResource.save({clientId : clientId},orderBookingData,function(data){
							localStorageService.remove("gatewayStatus");
							localStorageService.remove("isAutoRenew");
							location.path('/services');
						});
						
					}else{
						RequestSender.bookOrderResource.save({clientId : clientId},orderBookingData,function(data){
							successFun(planData);
						});
					}
				}else if(screenName == "changeorder"){
					var changeOrderData 			 = {};
					changeOrderData.billAlign 		 = false;
					changeOrderData.isNewplan 		 = false;
					changeOrderData.locale 			 = rootScope.localeLangCode; 
					changeOrderData.dateFormat 		 = 'dd MMMM yyyy'; 
					var reqDate 					 = dateFilter(new Date(),'dd MMMM yyyy');
					changeOrderData.start_date 		 = reqDate; 
					changeOrderData.disconnectionDate= reqDate;
					changeOrderData.paytermCode 	 = planData.billingFrequency; 
					changeOrderData.contractPeriod 	 = planData.contractId; 
					changeOrderData.planCode 		 = planId;
					changeOrderData.disconnectReason = "Not Interested";
					changeOrderData.autoRenew 		 = isAutoRenew;
					var orderId						 = "";
					localStorageService.get("storageData")? orderId = localStorageService.get("storageData").orderId
														  : orderId = "";
					if(gatewayStatus == "PENDING"){
						changeOrderData.status 		= gatewayStatus;
						changeOrderData.actionType	= screenName;
						RequestSender.scheduleOrderResource.save({clientId : clientId},changeOrderData,function(data){
							localStorageService.remove("gatewayStatus");
							successFun(planData);
						});
					}else if(gatewayStatus == "RECURRING"){
						changeOrderData.status 	= gatewayStatus;
						changeOrderData.actionType	= screenName;
						RequestSender.scheduleOrderResource.save({clientId : clientId},changeOrderData,function(data){
							localStorageService.remove("gatewayStatus");
							localStorageService.remove("isAutoRenew");
							location.path('/services');
						});
						
					}else{
						RequestSender.changeOrderResource.update({'orderId':orderId},changeOrderData,function(data){
							successFun(planData);
						});
					}
				}else if(screenName == "renewalorder"){
						 var renewalOrderData 			 = {};
						 renewalOrderData.renewalPeriod  = planData.contractId; 
						 renewalOrderData.priceId  		 = priceId; 
						 renewalOrderData.description	 = 'Order Renewal through selfcare'; 
						 
						 var orderId						 = "";
						localStorageService.get("storageData")? orderId = localStorageService.get("storageData").orderId
																  : orderId = "";
						if(gatewayStatus == "PENDING"){
							renewalOrderData.status 		= gatewayStatus;
							renewalOrderData.actionType	= screenName;
							RequestSender.scheduleOrderResource.save({clientId : clientId},renewalOrderData,function(data){
								localStorageService.remove("gatewayStatus");
								successFun(planData);
							});
						}else if(gatewayStatus == "RECURRING"){
							renewalOrderData.status 		= gatewayStatus;
							renewalOrderData.orderId 		= orderId;
							renewalOrderData.actionType		= screenName;
							RequestSender.scheduleOrderResource.save({clientId : clientId},renewalOrderData,function(data){
								localStorageService.remove("gatewayStatus");
								localStorageService.remove("isAutoRenew");
								location.path('/services');
							});
						}else{
							RequestSender.orderRenewalResource.save({orderId :orderId},renewalOrderData,function(data){
								 successFun(planData);
							 });
						}
				}
				break;
			  }
			}
		   break;
		  }
		}
	  });
     }else if(screenName == "vod"){
    	 var mediaDatas 	= [];
    	 	 mediaDatas 	= localStorageService.get("eventData") || "";
    	 var eventSavedOneByOneFun = function(val){
			 RequestSender.eventsResource.save(eventFormData[val],function(data){
				 if(val == eventFormData.length-1){
					 successFun("adding Events");
				 }else{
					 val += 1;
				 	eventSavedOneByOneFun(val);
			 	 }
			 });
		 };
	 
		 var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
		var eventFormData = [];
		 for(var i in mediaDatas) {
			 
				 eventFormData[i] = {
					 							eventId 		: mediaDatas[i].eventId,
					 							optType 		: mediaDatas[i].optType,
					 							formatType 		: mediaDatas[i].quality,
					 							clientId 		: clientId,
					 							locale 			: rootScope.localeLangCode,
					 							eventBookedDate : reqDate,
					 							dateFormat 		: 'dd MMMM yyyy',
					 							deviceId 		: clientData.hwSerialNumber
				 							};
			 if(i == mediaDatas.length-1){
				 eventSavedOneByOneFun(0);
			 }
		 }
     }
	});
		 
  };

selfcareApp.controller('OrderBookingScreenController', ['RequestSender',
                                                        '$rootScope',
                                                        '$location',
                                                        'dateFilter',
                                                        '$routeParams',
                                                        'localStorageService',
                                                         OrderBookingScreenController]);
