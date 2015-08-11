(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ClientOneTimeSaleController: function(scope, webStorage,routeParams , location, resourceFactory,dateFilter,$rootScope,API_VERSION,http) {
		  
			  scope.clientId=routeParams.id;
			  var officeId=routeParams.officeId;
			  scope.formData = {};
			  scope.unitsValue = "";
			  var clientData = webStorage.get('clientData');
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
		        scope.itemId=null;
	            scope.data={};
	            //scope.maxDate = new Date();
	            scope.truefalse = true;
	            scope.walletConfig = webStorage.get('is-wallet-enable');
	          
	        resourceFactory.oneTimeSaleTemplateResource.getOnetimes(function(data) {
	            
	        	scope.itemDatas = data.itemDatas;
	            scope.discountMasterDatas = data.discountMasterDatas;
	            scope.contractPeriods = data.contractPeriods;
	            scope.formData.discountId = scope.discountMasterDatas[0].discountMasterId;
	            scope.onetimesales=data;
	            scope.date= {};
	            scope.date.saleDate = new Date(data.date);
	            scope.maxDate = new Date(data.date);
	            scope.formData.saleType=scope.saleType;

	            if(scope.saleType == 'DEVICERENTAL'){
	            	scope.formData.totalPrice=0;
	            }
	            scope.officesDatas=data.officesData;
	            for(var i=0;i<scope.officesDatas.length;i++){
	            	if(scope.officesDatas[i].id==officeId){
	            		scope.formData.officeId=scope.officesDatas[i].id;
	            	}
	            }
	        });
	        
	        scope.itemData=function(itemId,officeId){
	        	 
	        	resourceFactory.oneTimeSaleTemplateResourceData.get({itemId: itemId,clientId:clientData.clientId}, function(data) {
	        		
	        		scope.formData=data;
	        		scope.unitsValue = data.units;
	        		var splitValue=data.units.split("S");
	        		scope.unit=splitValue[0];
	        		scope.formData.itemId=itemId;
	        		scope.formData.discountId = scope.discountMasterDatas[0].discountMasterId;
	        		scope.formData.officeId=officeId;
	        		//scope.formData.amount = data.feeMasterData[0].defaultFeeAmount;
	        		scope.truefalse = false;
	        		 if(scope.saleType == 'DEVICERENTAL'){
	 	            	scope.formData.totalPrice=0;
	 	            }
		        });	
	        };
	        
	        scope.itemDataQuantity=function(quantity,itemId,officeId,units,amount){
	        	this.data.unitPrice=this.formData.unitPrice;
	        	this.data.locale=$rootScope.locale.code;
	        	this.data.quantity=quantity;
	        	this.data.units = units;
	        	resourceFactory.oneTimeSaleQuantityResource.get({itemId:itemId},this.data, function(data) {
	        		
	        		scope.formData=data;
	        		scope.formData.quantity=quantity;
	        		scope.formData.itemId=itemId;
	        		scope.formData.discountId = scope.discountMasterDatas[0].discountMasterId;
	        		scope.formData.officeId=officeId;
	        		scope.formData.amount = amount;
		            
	        		 if(scope.saleType == 'DEVICERENTAL'){
	 	            	scope.formData.totalPrice=0;
	 	            }
		        });	
	        };
	        
	       
	        scope.getData = function(query){
	        	return http.get($rootScope.hostUrl+API_VERSION+'/itemdetails/'+scope.formData.itemId+'/'+scope.formData.officeId, {
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
	        	      return itemDetails;
	        	    });
            };
	        
            scope.getNumber = function(num) {
	        	
            	if(num){
	              return new Array(parseInt(num));
            	}else{  
	              return new Array(0);
            	}
	        	
	         };
	         
	         
	        scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "Sale" });
	           };
	        scope.submit = function() { 
	        	
	        	scope.flag = true;
	        	 this.formData.locale = $rootScope.locale.code;
	             this.formData.dateFormat = "dd MMMM yyyy";
	             this.formData.saleType = scope.saleType;
	             var actDate = dateFilter(scope.date.saleDate,'dd MMMM yyyy');
	             this.formData.saleDate=actDate;
	             delete this.formData.discountMasterDatas;   
	             delete this.formData.warranty;
	             delete this.formData.itemDatas;
	             delete this.formData.units;
	             delete this.formData.itemCode;
	             delete this.formData.id;
	             delete this.formData.feeMasterData;
	         
	             if(scope.unitsValue == 'PIECES'){
	            	 var temp1 = new Array();
			        	
			        	$("input[name='serialNumber']").each(function(){
			        		var temp = {};
			    			temp["serialNumber"] = $(this).val();
			    			temp["orderId"] = routeParams.id;
			    			temp["clientId"] = routeParams.id;
			    			temp["status"] = "allocated";
			    			temp["itemMasterId"] = scope.formData.itemId;
			    			temp["isNewHw"]="Y";
			    			temp1.push(temp);
			        	});
			        	this.formData.serialNumber=temp1;
	             }
	             
		            delete this.formData.serialNumbers;
		            delete this.formData.chargesData;
	            resourceFactory.oneTimeSaleResource.save({clientId:routeParams.id,devicesaleTpye:scope.saleType},this.formData,function(data){
	            	 location.path('/viewclient/' + routeParams.id);
	          },function(errData){
	        	  scope.flag = false;
	          });
	            webStorage.add("callingTab", {someString: "Sale" });
	            
	        	
	        };
	    }
	  });
	  mifosX.ng.application.controller('ClientOneTimeSaleController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','dateFilter','$rootScope','API_VERSION','$http', mifosX.controllers.ClientOneTimeSaleController]).run(function($log) {
        $log.info("ClientOneTimeSaleController initialized");
    });
}(mifosX.controllers || {}));