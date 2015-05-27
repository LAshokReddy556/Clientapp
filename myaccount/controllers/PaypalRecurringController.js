PaypalRecurringController = function(scope,RequestSender,location,localStorageService,routeParams) {
 
		var screenName 		= routeParams.screenName||"";
		var clientId 		= routeParams.clientId||"";
		var planId 			= routeParams.planId||"";
		var priceId 		= routeParams.priceId||"";
		scope.price 		= routeParams.price||"";
		scope.emailId 		= routeParams.emailId||"";
		var contractId 		= routeParams.contractId||"";
		var selfcareAppUrl	= selfcareModels.selfcareAppUrl;
		
		scope.returnURL 	= selfcareAppUrl+"#/paypalrecurringsuccess/"+screenName+"/"+clientId+"/"+planId+"/"+priceId;
		
		var chargeCodeData = "";var orderId = null ;
		localStorageService.get("chargeCodeData") ? (chargeCodeData = localStorageService.get("chargeCodeData").data,
													orderId = localStorageService.get("chargeCodeData").orderId):"";
			console.log(orderId);
		scope.period		= chargeCodeData.chargeDuration;
		scope.time			= chargeCodeData.durationType[0];
		
		if(screenName == "changeorder"){
			scope.customValue   = { clientId:clientId,planId:planId,paytermCode:chargeCodeData.billFrequencyCode,
					contractPeriod:contractId,orderId:orderId};
		}else if(screenName == "renewalorder"){
			scope.customValue   = {clientId:clientId,planId:planId,paytermCode:chargeCodeData.billFrequencyCode,
						renewalPeriod:contractId,orderId:orderId,priceId:priceId};
		}else{
			scope.customValue   = { clientId:clientId,planId:planId,paytermCode:chargeCodeData.billFrequencyCode,contractPeriod:contractId};
		}
		var billFrequencyCode = 0;
		var durationType = 0;
			switch (chargeCodeData.durationType) {
									case "Month(s)":
										durationType = 30;
										break;
									case "Day(s)":
										durationType = 1;
										break;
									case "Week(s)":
										durationType = 7;
										break;
									case "Year(s)":
										durationType = 365;
										break;
									default:
										break;
			};
			switch (chargeCodeData.billFrequencyCode) {
									case "Monthly":
										billFrequencyCode = 30;
										break;
									case "Daily":
										billFrequencyCode = 1;
										break;
									case "Weekly":
										billFrequencyCode = 7;
										break;
									case "Yearly":
										billFrequencyCode = 365;
										break;
									default:
										break;
			};
			console.log(billFrequencyCode/durationType*chargeCodeData.chargeDuration);
			scope.srt = Math.round(billFrequencyCode/durationType*chargeCodeData.chargeDuration);
        	
        	        	
        };
        
selfcareApp.controller('PaypalRecurringController', ['$scope',
                                                  'RequestSender', 
                                                  '$location', 
                                                  'localStorageService',
                                                  '$routeParams',
                                                  PaypalRecurringController]);

