PrepaidPlansController = function(scope,RequestSender,localStorageService,location,$modal,route,dateFilter,rootScope,$log) {
	
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
	     
	     scope.checkingRecurringStatus = function(autoRenew){
			  
			  if(scope.planId && scope.billingFrequency && scope.priceId && scope.price){
				 
				RequestSender.finalPriceCheckingResource.get({priceId:scope.priceId,clientId:scope.clientId},function(data){
				   scope.screenName == "additionalorders" ?
						localStorageService.add("chargeCodeData",{data:data,billingFrequency:scope.billingFrequency}) :
							localStorageService.add("chargeCodeData",{data:data,orderId:scope.selectedOrderId,billingFrequency:scope.billingFrequency});
						
				   (scope.screenName == "renewalorder") ?
							localStorageService.add("isAutoRenew",scope.orderRenew):
								localStorageService.add("isAutoRenew",autoRenew);
				   
						location.path( '/paymentprocess/'+scope.screenName+'/'+scope.planId+'/'+scope.priceId+'/'+data.finalAmount);
			    });
			  }else if(scope.price == 0){
				  (scope.screenName == "renewalorder") ?
							localStorageService.add("isAutoRenew",scope.orderRenew):
								localStorageService.add("isAutoRenew",autoRenew);
							
				  location.path( '/paymentprocess/'+scope.screenName+'/'+scope.planId+'/'+scope.priceId+'/'+scope.price);
			  }
				
			};
};

selfcareApp.controller('PrepaidPlansController', ['$scope',
                                              'RequestSender',
                                              'localStorageService',
                                              '$location',
                                              '$modal',
                                              '$route',
                                              'dateFilter',
                                              '$rootScope',
                                              '$log',
                                              PrepaidPlansController]);
