PostpaidPlansController = function(scope,RequestSender,localStorageService,location,$modal,route,dateFilter,rootScope,$log) {
	
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
	    	if(scope.planType == 'postpaid'){
	    		
	    		if(scope.planId!=planId){
	    			delete scope.contractPeriod;
	    		}
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
	      			   if(!scope.contractPeriod){
		      			   delete scope.priceId;
		      			   console.log(scope.priceId);
		      			   $log.info('Modal dismissed at: ' + new Date());
	      			   }
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
				 
				RequestSender.finalPriceCheckingResource.get({priceId:scope.priceId,clientId:scope.clientId,
																contractId:scope.contractId,paytermCode:scope.billingFrequency},function(data){
				   scope.screenName == "additionalorders" ?
						localStorageService.add("chargeCodeData",{data:data,billingFrequency:scope.billingFrequency}) :
							localStorageService.add("chargeCodeData",{data:data,orderId:scope.selectedOrderId,billingFrequency:scope.billingFrequency});
						
						localStorageService.add("isAutoRenew",angular.toJson(false));
						
						location.path( '/paymentprocess/'+scope.screenName+'/'+scope.planId+'/'+scope.priceId+'/'+data.finalAmount);
			    });
			  }else if(scope.price == 0){
					 localStorageService.add("isAutoRenew",angular.toJson(false));
				  location.path( '/paymentprocess/'+scope.screenName+'/'+scope.planId+'/'+scope.priceId+'/'+scope.price);
			  }
				
			};
};

selfcareApp.controller('PostpaidPlansController', ['$scope',
                                              'RequestSender',
                                              'localStorageService',
                                              '$location',
                                              '$modal',
                                              '$route',
                                              'dateFilter',
                                              '$rootScope',
                                              '$log',
                                              PostpaidPlansController]);
