ServicesController = function(scope,RequestSender,localStorageService,location,paginatorService,$modal,route,dateFilter,rootScope) {
		  
		  	scope.getOrdersData = function(offset, limit, callback) {
			  retrivingOrdersData.pageItems = [];
				  var itrCount = 0;
				  for (var i=offset;i<clientOrdersData.length;i++) {
					 itrCount += 1;
					 retrivingOrdersData.pageItems.push(clientOrdersData[i]);
					 if(itrCount==limit){
						 break;
					 }
			      }
				  callback(retrivingOrdersData);
		  	};
		  var isAutoRenewConfig = angular.fromJson(localStorageService.get("isAutoRenewConfig"));
		  	var clientOrdersData =[]; var retrivingOrdersData = {};scope.ordersData = [];
		  	var completeOrdersData = [];
	  	  var clientData= localStorageService.get('clientTotalData');
	  	  function initialFunCall(){
	  		scope.screenName = "additionalorders";
		    if(clientData){
			  scope.clientId = clientData.id;
			  
			  RequestSender.getOrderResource.get({clientId:scope.clientId},function(data){
				  clientOrdersData = data.clientOrders;
				  retrivingOrdersData.totalFilteredRecords = clientOrdersData.length;
				 // scope.ordersData = paginatorService.paginate(scope.getOrdersData,3);
				  scope.ordersData = clientOrdersData;
				  
				  //new code for new ui
				  var totalOrdersData = []; 
				  RequestSender.orderTemplateResource.query({region : clientData.state},function(data){
					  completeOrdersData = data;
					  totalOrdersData = completeOrdersData;
					  scope.plansData = [];
						  for(var i in clientOrdersData ){
							  totalOrdersData = _.filter(totalOrdersData, function(item) {
			                      return item.planCode != clientOrdersData[i].planCode;
			                  });
						  }
						  for(var j in totalOrdersData){
							  totalOrdersData[j].autoRenew = isAutoRenewConfig;
							if(totalOrdersData[j].isPrepaid == 'Y')scope.plansData.push(totalOrdersData[j]); 
						  }
						  localStorageService.add("storageData",{clientData:clientData,totalOrdersData:totalOrdersData});
				  });
			  });
		    }
	  	  }initialFunCall();
		  
	 scope.packageSelectionFun = function(selectedOrderId,selectedPlanId,orderStatus,orderRenew){
		 scope.orderRenew = angular.uppercase(orderRenew) == 'Y';
		 scope.selectedOrderId = selectedOrderId;
		 scope.selectedPlanId = selectedPlanId;
		 
		 if(angular.lowercase(orderStatus) == 'active'){
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
				if(totalOrdersData[j].isPrepaid == 'Y')scope.plansData.push(totalOrdersData[j]); 
			  }
			  localStorageService.add("storageData",{clientData:clientData,totalOrdersData:totalOrdersData,orderId:scope.selectedOrderId});
	 	}
		if(angular.lowercase(orderStatus) == 'disconnected'){
			scope.screenName = "renewalorder";var totalOrdersData = [];
			angular.copy(completeOrdersData,totalOrdersData);
				  scope.plansData = [];
				  for(var j in totalOrdersData){
						if((totalOrdersData[j].planId == scope.selectedPlanId) && (totalOrdersData[j].isPrepaid == 'Y')){
							totalOrdersData[j].autoRenew = isAutoRenewConfig;
							scope.plansData.push(totalOrdersData[j]); 
							break;
						}
					  }
			  localStorageService.add("storageData",{clientData:clientData,totalOrdersData:totalOrdersData,orderId:scope.selectedOrderId});
		  }
	  };
	  
	  scope.revertRadioBtnFun = function(){
		  scope.selectedOrderId = '';
		  route.reload();
	  };
	  
       scope.durationSelectionFun = function(priceData,planId){
    	   if(priceData.contractId != 0){
    		   scope.planId 	= planId;				scope.billingFrequency 	= priceData.billingFrequency;
    		   scope.priceId 	= priceData.id;			scope.price 			= priceData.price;
    		   scope.duration 	= priceData.duration;
    	   }else if(priceData.contractId == 0){
    		   alert("Contract Id is '0',Please Choose another.....");
    	   }
       };
	  scope.checkingRecurringStatus = function(autoRenew){
		  if(scope.planId && scope.billingFrequency && scope.priceId && scope.price){
			RequestSender.recurringStatusCheckingResource.get({planId:scope.planId,billFrequency:scope.billingFrequency,contractPeriod:scope.duration,clientId:scope.clientId},function(data){
				if(scope.billingFrequency == data.billFrequencyCode && scope.price == data.price){
					if(scope.screenName == "additionalorders")localStorageService.add("chargeCodeData",{data:data});
					if(scope.screenName == "changeorder" || scope.screenName == "renewalorder")localStorageService.add("chargeCodeData",{data:data,orderId:scope.selectedOrderId});
					console.log('This is the state of my isAutoRenew: ' + autoRenew);
					if(scope.screenName == "renewalorder")localStorageService.add("isAutoRenew",scope.orderRenew);
					else localStorageService.add("isAutoRenew",autoRenew);
					location.path( '/paymentprocess/'+scope.screenName+'/'+scope.planId+'/'+scope.priceId+'/'+scope.price);
				}
			});
		  }else if(scope.price == 0){
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
                                              'PaginatorService',
                                              '$modal',
                                              '$route',
                                              'dateFilter',
                                              '$rootScope',
                                              ServicesController]);
