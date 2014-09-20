(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  AdditionalOrdersController: function(scope,RequestSender,rootScope,routeParams,modal,
			  							webStorage,HttpService,authenticationService,sessionManager,location) {
		  
		  	scope.isOrderPage = true;
		  	scope.isPaymentPage = false;
		  	scope.isRedirectToDalpay = false;
		  	scope.isAmountZero = false;
		  	scope.totalPlansData = [];
		  	scope.plansData = [];
			scope.clientData = {};
			scope.clientOrdersData = [];
			scope.pricingData = [];
		  	
		  //declaration of formData
			  scope.formData = {};
			  
		  //getting dalpay Url
		  scope.dalpayURL = selfcare.models.dalpayURL;
		  	
		  var clientDatas = webStorage.get("clientTotalData");
		  if(clientDatas){
			  scope.formData = clientDatas.clientData;
			  scope.formData.clientId = clientDatas.clientId;
		  }
		  console.log(scope.formData);
    	  
			  if(scope.isOrderPage == true){
				 
				 if(routeParams.clientId == 0 && routeParams.orderId == 0){
					  RequestSender.orderTemplateResource.query({region : scope.formData.state},function(data){
						  scope.totalPlansData = data;
						  
						  RequestSender.getOrderResource.get({clientId:scope.formData.clientId},function(data){
							  scope.clientOrdersData = data.clientOrders;
							  for(var i in scope.clientOrdersData ){
								  scope.totalPlansData = _.filter(scope.totalPlansData, function(item) {
				                      return item.planCode != scope.clientOrdersData[i].planCode;
				                  });
							  }
							  for(var j in scope.totalPlansData){
								  if(scope.totalPlansData[j].isPrepaid == 'Y'){
									  scope.plansData.push(scope.totalPlansData[j]); 
								  }
							  }
							 // scope.plansData = scope.totalPlansData;
						  });
					  });
				 }
				  
			  }
			  var hostName = selfcare.models.selfcareAppUrl;
			  
			scope.paymentGatewayFun  = function(paymentGatewayName){
		    	  console.log(paymentGatewayName);
		    	  if(paymentGatewayName == 'dalpay'){
		    		  scope.paymentDalpayURL = scope.dalpayURL+"&cust_name="+scope.formData.lastname+"&cust_phone="+scope.formData.phone+"&cust_email="+scope.formData.email+"&cust_state="+scope.formData.state+""+
  	  				"&cust_address1="+scope.formData.addressNo+"&cust_zip="+scope.formData.zip+"&cust_city="+scope.formData.city+"&item1_desc="+scope.formData.planName+"&item1_price="+scope.formData.planAmount+"" +
  	  				"&user1="+scope.formData.id+"&user3=additionalorderspreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId; 
		    	  }else if(paymentGatewayName == 'korta'){
		    		  var selfcareUserData = webStorage.get("selfcareUserData");
		    		  var token = selfcareUserData.selfcare.token;
		    		  if(token != null && token != ""){
		    			  scope.paymentDalpayURL = "#/kortatokenpayment/"+routeParams.orderId+"/"+routeParams.clientId;
		    		  }else{
		    			  scope.paymentDalpayURL = "#/kortaIntegration";
		    		  }
		    	  };
		      };
			  
		  scope.selectedPLandAm = function(contractId,planId,chargeCode,price,planCode,duration){
		    	 
			  scope.isOrderPage = false;
			 // scope.isPaymentPage = true;
			  scope.formData.planAmount = price;
			  scope.duration = duration;
	    	  scope.formData.contractperiod = contractId;
	    	  scope.formData.planCode = planId;
	    	  scope.formData.paytermCode = chargeCode;
	    	  scope.formData.planName = planCode;
	    	  if(price==0){
	    		  scope.isAmountZero = true;
	    		  scope.isPaymentPage = false;
	    	  }else{
	    		  scope.isAmountZero = false;
	    		  scope.isPaymentPage = true;
	    	  }
	    	  scope.paymentGatewayFun('dalpay');
	    	  	//var host = window.location.hostname;
	    		//var portNo = window.location.port;
	    	 
	    	 /* scope.paymentDalpayURL = scope.dalpayURL+"&cust_name="+scope.formData.lastname+"&cust_phone="+scope.formData.phone+"&cust_email="+scope.formData.email+"&cust_state="+scope.formData.state+""+
	    	  				"&cust_address1="+scope.formData.addressNo+"&cust_zip="+scope.formData.zip+"&cust_city="+scope.formData.city+"&item1_desc="+scope.formData.planName+"&item1_price="+scope.formData.planAmount+"" +
	    	  				"&user1="+scope.formData.id+"&user3=additionalorderspreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId;*/
	    	  
	      };
	      
	      scope.makePaymentFun =function(){
	    	  console.log(scope.formData);
	    	  webStorage.add('form','orderbook');
	    	  webStorage.add("additionalPlanFormData",scope.formData);
	    	  scope.isRedirectToDalpay = true;
	      };
	      
	      scope.cancelPaymentFun = function(){
	    	  scope.isOrderPage = true;
			  	scope.isPaymentPage = false;
			  	scope.isRedirectToDalpay = false;
			  	scope.isAmountZero = false;
	      };
	      
	      scope.finishBtnFun =function(){
	    	  
	    	  webStorage.add("additionalPlanFormData",scope.formData);
    		  location.path("/additionalorderspreviewscreen/"+routeParams.orderId+"/"+routeParams.clientId);
	      };
  		
    }
  });
  selfcare.ng.application.controller('AdditionalOrdersController', 
 ['$scope','RequestSender','$rootScope','$routeParams','$modal','webStorage','HttpService','AuthenticationService',
  'SessionManager','$location',selfcare.controllers.AdditionalOrdersController]);
}(selfcare.controllers || {}));
