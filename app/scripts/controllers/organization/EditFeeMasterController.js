(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditFeeMasterController: function(scope, routeParams, resourceFactory, location,$rootScope,webStorage) {
	        
	        scope.feeMasterData = [],scope.regionDatas = [],scope.feeMasterRegionPricesDatas = [];
	        scope.regionPrices = []; scope.formData = {};scope.formData.removeRegionPrices = [];
	        resourceFactory.feeMasterResource.get({id: routeParams.id} , function(data) {
	            scope.feeMasterData = data.feeMasterData;
	            scope.formData.feeCode 			= scope.feeMasterData.feeCode;
	            scope.formData.feeDescription 	= scope.feeMasterData.feeDescription;
	            scope.formData.transactionType	= scope.feeMasterData.transactionType;
	            scope.formData.chargeCode 		= scope.feeMasterData.chargeCode;
	            scope.formData.defaultFeeAmount = scope.feeMasterData.defaultFeeAmount;
	            scope.regionDatas 				= data.regionDatas;
	            scope.transactionTypeDatas 		= data.transactionTypeDatas;
	            scope.chargeDatas 				= data.chargeDatas;
	            scope.feeMasterRegionPricesDatas = data.feeMasterRegionPricesDatas;
	            /*scope.itemTypeDatas = data.itemCodes;*/
	            scope.formData.itemId = scope.feeMasterData.itemId;
	            if(scope.feeMasterData.isRefundable != undefined){
	            	scope.formData.isRefundable = scope.feeMasterData.isRefundable == 'Y'?true:false;
	            }
	            
	            for(var i in scope.feeMasterRegionPricesDatas){
	            	
	            	scope.regionPrices.push({
	            								"regionId" : scope.feeMasterRegionPricesDatas[i].regionId,
	            								"amount"   : scope.feeMasterRegionPricesDatas[i].amount,
	            								"id"   	   : scope.feeMasterRegionPricesDatas[i].id
	            	});	
	            }
	        });
	        
	        scope.addReginalPrice = function () {
		           if (scope.regionalPriceFormData.regionId && scope.regionalPriceFormData.amount) {
		        	   
		                scope.regionPrices.push({regionId:scope.regionalPriceFormData.regionId, 
		                							amount:scope.regionalPriceFormData.amount
		                });
		              
		                scope.regionalPriceFormData.regionId = undefined;
		                scope.regionalPriceFormData.amount = undefined;
		                
		          	}
		       };
	        scope.removeRegionPrices = function (index) {
	        	
	        	scope.formData.removeRegionPrices.push({
															id : scope.regionPrices[index].id,
															regionId:scope.regionPrices[index].regionId, 
															amount:scope.regionPrices[index].amount,
															locale:$rootScope.locale.code
														});
	            scope.regionPrices.splice(index,1);
	          };
	          
	        scope.submit = function() {
	          	 scope.formData.regionPrices =[];
	          	 if (scope.regionPrices.length > 0) {
	                   for (var i in scope.regionPrices) {
	                	   
	                     scope.formData.regionPrices.push({
	                    	 								id : scope.regionPrices[i].id,
	                    	 								regionId:scope.regionPrices[i].regionId, 
	                    	 								amount:scope.regionPrices[i].amount,
	                    	 								locale:$rootScope.locale.code
	                    	 							});
	                   };
	                 }
	          	if(scope.formData.transactionType == 'Deposit'){
	          		var tempValue = scope.formData.isRefundable;
	          		if(tempValue){
	          			scope.formData.isRefundable = 'Y';
	          		}else{
	          			scope.formData.isRefundable = 'N';
	          		}
	          	}else{
	          		delete scope.formData.itemId;
	          		delete scope.formData.isRefundable;
	          	}
	          	scope.formData.locale = $rootScope.locale.code;
	          	scope.formData.defaultFeeAmount=0;
	             resourceFactory.feeMasterResource.update({id:routeParams.id},scope.formData,function(data){
	              location.path('/viewfeemaster/'+data.resourceId);
	            });
	          };
	  }
  });
  mifosX.ng.application.controller('EditFeeMasterController', ['$scope', '$routeParams', 'ResourceFactory', '$location','$rootScope','webStorage', mifosX.controllers.EditFeeMasterController]).run(function($log) {
    $log.info("EditFeeMasterController initialized");
  });
}(mifosX.controllers || {}));
