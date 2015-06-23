ServicesController = function(scope,RequestSender,localStorageService,location,$modal,route,dateFilter,rootScope,$log) {
		  
		  var isAutoRenewConfig = angular.fromJson(localStorageService.get("isAutoRenewConfig"));
		  	var clientOrdersData =[]; scope.ordersData = [];
		  	var completeOrdersData = [];
	  	  var clientData= {};
	  	  function initialFunCall(){
	  		 if(rootScope.selfcare_sessionData){
	  			 scope.clientId = rootScope.selfcare_sessionData.clientId;
	  		   RequestSender.clientResource.get({clientId: scope.clientId} , function(clientTotalData) {
	  			  scope.screenName = "additionalorders";
	  			  clientData	   = clientTotalData;
  				  RequestSender.getOrderResource.get({clientId:scope.clientId},function(data){
  					  clientOrdersData = data.clientOrders;
  					  scope.ordersData = clientOrdersData;
  					  angular.forEach(scope.ordersData,function(value,key){
  						  if(value.isPrepaid == 'Y'){
  							  scope.ordersData[key].planType = 'prepaid';
  						  }else{
  							scope.ordersData[key].planType = 'postpaid';
  						  }
  					  });
  					  
  					  //new code for new ui
  					  var totalOrdersData = []; 
  					  RequestSender.orderTemplateResource.query({region : clientData.state},function(data){
  						  completeOrdersData = data;
  						  totalOrdersData = completeOrdersData;
  						  scope.plansData = [];
  						  for(var i in clientOrdersData ){
  							  if(angular.lowercase(clientOrdersData[i].status) == 'pending'){
  								  scope.existOrderStatus = 'pending';
  							  }
  							  totalOrdersData = _.filter(totalOrdersData, function(item) {
  								  return item.planCode != clientOrdersData[i].planCode;
  							  });
  						  }
  						  for(var j in totalOrdersData){
  							  totalOrdersData[j].autoRenew = isAutoRenewConfig;
  							  if(scope.planType == 'prepaid')
  							  if(totalOrdersData[j].isPrepaid == 'Y')scope.plansData.push(totalOrdersData[j]); 
  							  if(scope.planType == 'postpaid')
  								  if(totalOrdersData[j].isPrepaid == 'N')scope.plansData.push(totalOrdersData[j]); 
  						  }
  						  localStorageService.add("storageData",{clientData:clientData,totalOrdersData:totalOrdersData});
  					  });
  				  });
	  		  });
	  	    }
	  	  }initialFunCall();
	  	  
	  scope.planType = 'prepaid';	  
	 scope.planTypeSelFun = function(name){
		 scope.planType = name;
		 if(scope.screenName == "additionalorders") initialFunCall();
		 if(scope.screenName == "changeorder") scope.activePackageSelectionFun(scope.selectedOrderId,scope.selectedPlanId,'ACTIVE',name);
		 if(scope.screenName == "renewalorder"){
			 scope.orderRenew ? orderRenew = 'Y': orderRenew = 'N';
			 scope.disconnectedPackageSelectionFun(scope.selectedOrderId,scope.selectedPlanId,'DISCONNECTED',orderRenew,name);
		 }
	 };
		  
	 scope.activePackageSelectionFun = function(selectedOrderId,selectedPlanId,orderStatus,planType){
		 scope.selectedOrderId = selectedOrderId;
		 scope.selectedPlanId  = selectedPlanId;
		 scope.planType		   = planType;
		 
			 scope.screenName = "changeorder";var totalOrdersData = [];
			 angular.copy(completeOrdersData,totalOrdersData);
			  for(var i in totalOrdersData){
				  for(var j in clientOrdersData){
					  
					  if(totalOrdersData[i].planId == clientOrdersData[j].pdid){
						 totalOrdersData[i].pricingData = _.reject(totalOrdersData[i].pricingData, function(item) {
							  return (item.duration == clientOrdersData[j].contractPeriod);
						  });
					  }
				  } 
			  }
			  scope.plansData = [];
			  for(var j in totalOrdersData){
				  totalOrdersData[j].autoRenew = isAutoRenewConfig;
				  if(scope.planType == 'prepaid')
					  if(totalOrdersData[j].isPrepaid == 'Y')scope.plansData.push(totalOrdersData[j]); 
				  if(scope.planType == 'postpaid')
					  if(totalOrdersData[j].isPrepaid == 'N')scope.plansData.push(totalOrdersData[j]); 
			  }
			  localStorageService.add("storageData",{clientData:clientData,totalOrdersData:totalOrdersData,orderId:scope.selectedOrderId});
	  };
	  scope.disconnectedPackageSelectionFun = function(selectedOrderId,selectedPlanId,orderStatus,orderRenew,planType){
		  scope.orderRenew 		= angular.uppercase(orderRenew) == 'Y';
		  scope.selectedOrderId = selectedOrderId;
		  scope.selectedPlanId  = selectedPlanId;
		  scope.planType		= planType;
		  
			  scope.screenName = "renewalorder";var totalOrdersData = [];
			  angular.copy(completeOrdersData,totalOrdersData);
			  scope.plansData = [];
			  for(var j in totalOrdersData){
				  if(scope.planType == 'prepaid'){
				    if((totalOrdersData[j].planId == scope.selectedPlanId) && (totalOrdersData[j].isPrepaid == 'Y')){
					  totalOrdersData[j].autoRenew = isAutoRenewConfig;
					  scope.plansData.push(totalOrdersData[j]); 
					  break;
				    }
				  }
				  if(scope.planType == 'postpaid'){
					  if((totalOrdersData[j].planId == scope.selectedPlanId) && (totalOrdersData[j].isPrepaid == 'N')){
						  totalOrdersData[j].autoRenew = isAutoRenewConfig;
						  scope.plansData.push(totalOrdersData[j]); 
						  break;
					  }
				  }
			  }
			  localStorageService.add("storageData",{clientData:clientData,totalOrdersData:totalOrdersData,orderId:scope.selectedOrderId});
	  };
	  
	  scope.revertRadioBtnFun = function(){
		  scope.selectedOrderId = '';
		  route.reload();
	  };
	  
     scope.durationSelectionFun = function(priceData,planId){
    	if(scope.existOrderStatus == 'pending'){
    		scope.priceId 	= priceData.id;
    		var modalInstance = $modal.open({
   			   templateUrl: 'messagespopup.html',
   			   controller: MessagesPopupController,
   			   resolve:{
   				   planId : function(){
   					   return planId;
   				   }
   			   }
   		   });
    	    modalInstance.result.then(function () {
    	    	delete scope.priceId;
     	      }, function () {
     			  delete scope.priceId;
     			 $log.info('Modal dismissed at: ' + new Date());
     		});
    	}else{ 
	    	 if(scope.planType == 'prepaid'){
	    	   if(priceData.contractId != 0){
	    		   scope.planId 	= planId;				scope.billingFrequency 	= priceData.billingFrequency;
	    		   scope.priceId 	= priceData.id;			scope.price 			= priceData.price;
	    		   
	    	   }else if(priceData.contractId == 0){
	    		   delete scope.priceId;
	    		   alert("Contract Id is '0',Please Choose another.....");
	    	   }
	    	 }else if(scope.planType == 'postpaid'){
	      		   scope.planId 	= planId;				scope.billingFrequency 	= priceData.billingFrequency;
	      		   scope.priceId 	= priceData.id;			scope.price 			= priceData.price;
	      		   
	      		   var modalInstance = $modal.open({
	      			   templateUrl: 'viewcontractperiods.html',
	      			   controller: ViewContractPeriodsPopupController,
	      			   resolve:{
	      				   planId : function(){
	      					   return planId;
	      				   }
	      			   }
	      		   });
	      		   modalInstance.result.then(function () {
	      			 localStorageService.add("contractsData",{contractId:scope.contractId,contractPeriod : scope.contractPeriod});
	      		   }, function () {
	      			   delete scope.priceId;
	      			   console.log(scope.priceId);
	      			   $log.info('Modal dismissed at: ' + new Date());
	      		   });
	    	 }
    	}
       };
       
       //Messages Popup Controller
       function  MessagesPopupController($scope, $modalInstance) {
    	   	  rootScope.popUpMsgs = [];
	    	  rootScope.popUpMsgs.push({
	    		  'image' : '../images/info-icon.png',
	    		  'names' : [{'name' : 'error.plan.already.pending'}]
	    	      });
		
	      		$scope.approve = function () { 
	      			$modalInstance.close('delete');
	      		};
		} 
      
       //View Contract Periods Popup Controller
       function ViewContractPeriodsPopupController($scope, $modalInstance,$log,planId) {
	    	RequestSender.gettingContractsResource.get({planId: planId,clientId:scope.clientId,template:'true'},function(data){
	    			 $scope.subscriptiondatas = data.subscriptiondata;
	    		 },function(errorData){
	    			 $scope.contractError = errorData.data.errors[0].userMessageGlobalisationCode;
	    		 });
	    	 
	    	$scope.approve = function (contractPeriod) {
	    		
	    		if(contractPeriod){
	    			
	    			angular.forEach($scope.subscriptiondatas,function(value,key){
	    				if(value.id == contractPeriod){
	    					scope.contractPeriod = value.Contractdata;
	    					scope.contractId   = value.id;
	    					$modalInstance.close('delete');
	    				}
	    			});
	    		}
	    	};
	    	
	    	$scope.cancel = function () {
	    		$modalInstance.dismiss('cancel');
	    	};
	    	 
	     };
	     
	  scope.checkingRecurringStatus = function(autoRenew){
		  
		  if(scope.planId && scope.billingFrequency && scope.priceId && scope.price){
			 
			RequestSender.recurringStatusCheckingResource.get({priceId:scope.priceId,clientId:scope.clientId},function(data){
			   scope.screenName == "additionalorders" ?
					localStorageService.add("chargeCodeData",{data:data,billingFrequency:scope.billingFrequency}) :
						localStorageService.add("chargeCodeData",{data:data,orderId:scope.selectedOrderId,billingFrequency:scope.billingFrequency});
					
			   if(scope.screenName == "renewalorder" && scope.planType == 'prepaid')
						localStorageService.add("isAutoRenew",scope.orderRenew);
			   else{
				  scope.planType == 'prepaid' ?localStorageService.add("isAutoRenew",autoRenew):
										localStorageService.add("isAutoRenew",angular.toJson(false));
			   }
					location.path( '/paymentprocess/'+scope.screenName+'/'+scope.planId+'/'+scope.priceId+'/'+data.finalAmount);
		    });
		  }else if(scope.price == 0){
			  if(scope.screenName == "renewalorder" && scope.planType == 'prepaid')
					localStorageService.add("isAutoRenew",scope.orderRenew);
			   else{
				  scope.planType == 'prepaid' ?localStorageService.add("isAutoRenew",autoRenew):
										localStorageService.add("isAutoRenew",angular.toJson(false));
			   }
			  location.path( '/paymentprocess/'+scope.screenName+'/'+scope.planId+'/'+scope.priceId+'/'+scope.price);
		  }
			
		};
		
	 scope.viewOrder = function(orderId){
		 scope.orderDisconnect = false;
		 var modalInstance = $modal.open({
                templateUrl: 'vieworder.html',
                controller: vieworderPopupController,
                resolve:{
                	orderId : function(){
                		return orderId;
                	}
                }
            });
		 modalInstance.result.then(function () {}, function () {
			 if(scope.orderDisconnect){route.reload();}
 	    });
     };
     scope.viewPlanServices = function(planId){
    	 scope.orderDisconnect = false;
    	 var modalInstance = $modal.open({
    		 templateUrl: 'viewplanservice.html',
    		 controller: viewPlanServicesPopupController,
    		 resolve:{
    			 planId : function(){
    				 return planId;
    			 }
    		 }
    	 });
    	 modalInstance.result.then(function () {}, function () {
    		 if(scope.orderDisconnect){route.reload();}
    	 });
     };
    function vieworderPopupController($scope, $modalInstance,$log,orderId) {
   	  function initialFunCall(){
    	RequestSender.getSingleOrderResource.get({orderId: orderId},function(data){
    		$scope.orderServices = data.orderServices;
    		$scope.orderData = data.orderData;
    		$scope.orderPricingDatas = data.orderPriceData;
			  if(data.orderData.isPrepaid == 'Y'){
				  $scope.orderData.isPrepaid="Pre Paid";
	            }else{
	            	$scope.orderData.isPrepaid="Post Paid";
	            }
		  });
   	  }initialFunCall();
    	
    	$scope.orderDisconnect = function(orderId){
    		var modalInstance = $modal.open({
    			templateUrl: 'OrderDisconnect.html',
    			controller: OrderDisconnectPopupController,
    			resolve:{
    				orderId : function(){
    					return orderId;
    				}
    			}
    		});
    	    modalInstance.result.then(function () {
    	    	scope.orderDisconnect = true;
    	    	initialFunCall();
    	    }, function () {
    	      $log.info('Modal dismissed at: ' + new Date());
    	    });
    		
    	};
   	  $scope.close = function () {$modalInstance.dismiss('cancel');};
         
     };
     
     function viewPlanServicesPopupController($scope, $modalInstance,$log,planId) {
    	RequestSender.planServicesResource.get({planId: planId},function(data){
    			 $scope.planServices = data.selectedServices;
    		 });
    	 
    	 $scope.close = function () {$modalInstance.dismiss('cancel');};
    	 
     };
     
       var OrderDisconnectPopupController = function ($scope, $modalInstance,orderId) {
           
			  $scope.flagOrderDisconnect=false;
			  $scope.disconnectDetails = [{'id':1,'mCodeValue':'Not Interested'},
			                              {'id':2,'mCodeValue':'Plan Change'},
							        	  {'id':3,'mCodeValue':'Wrong plan'}];
     	  $scope.start = {};
     	  $scope.start.date = new Date();
     	  $scope.formData = {};
     	  
     	  $scope.approveDisconnection = function () {
     		  $scope.flagOrderDisconnect=true;
     		  
     		 RequestSender.getRecurringScbcriberIdResource.get({orderId:orderId},function(recurringdata){
     			scope.recurringData = angular.fromJson(angular.toJson(recurringdata));
     			scope.subscriberId	= scope.recurringData.subscriberId;
     			console.log("subscriberId-->"+scope.subscriberId);
     			if(scope.subscriberId){
     				var formData = {orderId:orderId,recurringStatus:"CANCEL",subscr_id : scope.subscriberId};
     				RequestSender.orderDisconnectByScbcriberIdResource.update(formData,function(data){
     					var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
     	     	        $scope.formData.dateFormat = 'dd MMMM yyyy';
     	     	        $scope.formData.disconnectionDate = reqDate;
     	     	        $scope.formData.locale = rootScope.localeLangCode;
     	     		  
     	     	        RequestSender.bookOrderResource.update({'orderId': orderId},$scope.formData,function(data){
     	     	        	$modalInstance.close('delete');
     	     	        },function(orderErrorData){
     	     	        	 $scope.flagOrderDisconnect=false;
     	     	        	$scope.orderError = orderErrorData.data.errors[0].userMessageGlobalisationCode;
     	     	        });
     				});
     			}else{
     				var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
         	        $scope.formData.dateFormat = 'dd MMMM yyyy';
         	        $scope.formData.disconnectionDate = reqDate;
         	        $scope.formData.locale = rootScope.localeLangCode;
         		  
         	        RequestSender.bookOrderResource.update({'orderId': orderId},$scope.formData,function(data){
         	        	$modalInstance.close('delete');
         	        },function(orderErrorData){
         	        	 $scope.flagOrderDisconnect=false;
         	        	$scope.orderError = orderErrorData.data.errors[0].userMessageGlobalisationCode;
         	        });
     			}
     		});
           };
           $scope.cancelDisconnection = function () {
               $modalInstance.dismiss('cancel');
           };
           
       };
       
       
	       
 };

selfcareApp.controller('ServicesController', ['$scope',
                                              'RequestSender',
                                              'localStorageService',
                                              '$location',
                                              '$modal',
                                              '$route',
                                              'dateFilter',
                                              '$rootScope',
                                              '$log',
                                              ServicesController]);
