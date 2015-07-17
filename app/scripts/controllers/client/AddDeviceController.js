(function(module) {
	  mifosX.controllers = _.extend(module, {
		  AddDeviceController: function(scope, webStorage,routeParams , location, resourceFactory,dateFilter,
				  																	$rootScope,API_VERSION,http) {
		  
			  scope.clientId=routeParams.clientId;
			  var officeId=routeParams.officeId;
			  scope.formData = {};
			  scope.date = {};
			  scope.date.saleDate = dateFilter(new Date(),"dd MMMM yyyy");
			  scope.officesDatas = [];
			  scope.itemMasterData = [];
			  scope.discountMasterDatas = [];
			  scope.contractPeriods = [];
			  scope.itemDatas = [];
			  
			  scope.newSaleType = false;
			  scope.secondSaleType = false;
			  scope.deviceRentalType = false;
			  scope.formData.dateFormat = "dd MMMM yyyy";
			  scope.formData.locale = "en";
			  scope.walletConfig = webStorage.get('is-wallet-enable');
			  
			  var clientData = webStorage.get('clientData');
			  if(webStorage.get('clientData')){
				    scope.hwSerialNumber=clientData.hwSerialNumber;
				    scope.displayName=clientData.displayName;
				    scope.statusActive=clientData.statusActive;
				    scope.accountNo=clientData.accountNo;
				    scope.officeName=clientData.officeName;
				    scope.balanceAmount=clientData.balanceAmount;
				    scope.hwSerialNumber=clientData.hwSerialNumber;
				    scope.currency=clientData.currency;
				    scope.imagePresent=clientData.imagePresent;
				    scope.categoryType=clientData.categoryType;
			        scope.email=clientData.email;
			        scope.phone=clientData.phone;
			        if(scope.imagePresent){
			        scope.image=clientData.image;
			        }
		  		}
		        
			  
			resourceFactory.oneTimeSaleTemplateResource.get(function(data) {
		            scope.offices = data.officesData;
		            
		            for(var i in scope.offices){
		            	if(scope.offices[i].id == officeId){
		            		scope.formData.officeId=scope.offices[i].id;
		            	}
		            }
		            
		            scope.discountMasterDatas = data.discountMasterDatas;

		            for(var i in scope.discountMasterDatas){
		                if(scope.discountMasterDatas[i].discountCode.toLowerCase() == "none"){
		                 scope.discountId = scope.discountMasterDatas[i].id; 
		                }
		               }

		            scope.itemDatas = data.itemDatas;
		            scope.contractPeriods = data.contractPeriods;
		            
		        }); 
	        
	        
	        scope.selectedNewSale = function(){
	        	
	        	delete scope.formData.totalPrice;
	        	delete scope.formData.discountId;
	        	scope.formData.discountId = scope.discountId;
	        	scope.formData.totalPrice = scope.formData.unitPrice;
	        	scope.newSaleType = !(scope.secondSaleType = scope.deviceRentalType = false);
	        	
	        };
	        
	        scope.selectedSecondSale = function(){
	        	
	        	delete scope.formData.totalPrice;
	        	scope.formData.totalPrice = scope.formData.unitPrice;
	        	scope.secondSaleType = !(scope.newSaleType = scope.deviceRentalType = false);
	        };
	        
	        scope.selectedDeviceRental = function(){
	        	
	        	scope.formData.totalPrice = 0;
	        	delete scope.formData.discountId;
	        	delete scope.formData.contractPeriod;
	        	scope.formData.discountId = scope.discountId;
	        	scope.deviceRentalType = !(scope.newSaleType = scope.secondSaleType = false);
	        };
	        
	        scope.getData = function(query){
	        	return http.get($rootScope.hostUrl+API_VERSION+'/itemdetails/0/0', {
	        	      params: {
	        	    	  		query: query
	        	      		   }
	        	    }).then(function(res){
	        	    						itemDetails = [];
						        	      for(var i in res.data.serialNumbers){
						        	    	  itemDetails.push(res.data.serialNumbers[i]);
						        	    	  if(i == 7)
						        	    		  break;
						        	      }

						        	    if(itemDetails.length == 0){
						        	    	delete scope.formData.itemId;
						        	    	delete scope.formData.chargeCode;
						        	    	delete scope.formData.unitPrice;
						        	    	delete scope.formData.quantity;
						        	    }
	        	      return itemDetails;
	        	    });
            };
	        
	        scope.getItemData = function(item,model,label){
	        	if(item || model || label){
	        		var serialNum = item || model || label;
	        		
		        	resourceFactory.itemMasterDetailTemplateResource.get({query : serialNum,clientId:scope.clientId},function(data) {

		        	   if(data){
		        		   scope.formData.itemId = data.id;
		        		   scope.formData.chargeCode = data.chargeCode;
		        		   scope.formData.unitPrice = data.unitPrice;
		        		   scope.formData.quantity = "1";
		        		  // scope.formData.amount = data.feeMasterData[0].defaultFeeAmount;
		        	   }
		        	});
	        	}
            };
            
	        scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "Sale" });
	         };
	         
	        scope.newSaleSaveBtnFun = function() { 
	        	
	        	scope.formData.saleType = "NEWSALE";
	        	scope.formData.saleDate = dateFilter(scope.date.saleDate,"dd MMMM yyyy");
	        	
	        	scope.formData.serialNumber = [{
	        										serialNumber 	: scope.itemDetail,
	        										orderId 		: scope.clientId, 
	        										clientId 		: scope.clientId, 
	        										status 			: "allocated", 
	        										itemMasterId 	: scope.formData.itemId,
	        										isNewHw 		: "Y"
	        									}];
	        	
	          resourceFactory.oneTimeSaleResource.save({clientId:scope.clientId,devicesaleTpye:scope.formData.saleType},scope.formData,function(data){
	        	  webStorage.add("callingTab", {someString: "Sale" });
	            	 location.path('/viewclient/' + routeParams.clientId);
	          });
	        	
	        };
	        
	        scope.secondSaleSaveBtnFun = function() { 
	        	
	        	var unitPrice = scope.formData.unitPrice;
	        	var chargeCode = scope.formData.chargeCode;
	        	scope.formData.saleType = "SECONDSALE";
	        	scope.formData.saleDate = dateFilter(scope.date.saleDate,"dd MMMM yyyy");
	        	scope.formData.unitPrice = parseInt(scope.formData.totalPrice);
	        	scope.formData.chargeCode = "NONE";
	        	scope.formData.discountId = scope.discountId;
	        	
	        	scope.formData.serialNumber = [{
									        		serialNumber 	: scope.itemDetail,
									        		orderId 		: scope.clientId, 
									        		clientId 		: scope.clientId, 
									        		status 			: "allocated", 
									        		itemMasterId 	: scope.formData.itemId,
									        		isNewHw 		: "Y"
									        	}];
	        	
	        	 resourceFactory.oneTimeSaleResource.save({clientId:scope.clientId,devicesaleTpye:scope.formData.saleType},scope.formData,function(data){
	        		 webStorage.add("callingTab", {someString: "Sale" });
	            	 location.path('/viewclient/' + routeParams.clientId);
	          	},function(errorData){
	          		scope.formData.unitPrice = unitPrice;
	          		scope.formData.chargeCode = chargeCode;
	          	});
	        	
	        };
	        
	        scope.deviceRentalSaveBtnFun = function() { 
	        	
	        	scope.formData.saleType = "DEVICERENTAL";
	        	scope.formData.saleDate = dateFilter(scope.date.saleDate,"dd MMMM yyyy");
	        	
	        	scope.formData.serialNumber = [{
									        		serialNumber 	: scope.itemDetail,
									        		orderId 		: scope.clientId, 
									        		clientId 		: scope.clientId, 
									        		status 			: "allocated", 
									        		itemMasterId 	: scope.formData.itemId,
									        		isNewHw 		: "Y"
									        	}];
	        	
	        	resourceFactory.oneTimeSaleResource.save({clientId:scope.clientId,devicesaleTpye:scope.formData.saleType},scope.formData,function(data){
	        		webStorage.add("callingTab", {someString: "Sale" });
	        		location.path('/viewclient/' + routeParams.clientId);
	        	});
	        	
	        };
	    }
	  });
	  mifosX.ng.application.controller('AddDeviceController', [
	                                                           '$scope',
	                                                           'webStorage',
	                                                           '$routeParams',
	                                                           '$location',
	                                                           'ResourceFactory',
	                                                           'dateFilter',
	                                                           '$rootScope',
	                                                           'API_VERSION',
	                                                           '$http',
	                                                           mifosX.controllers.AddDeviceController]).run(function($log) {
        $log.info("AddDeviceController initialized");
    });
}(mifosX.controllers || {}));