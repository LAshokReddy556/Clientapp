(function(module) {
  mifosX.controllers = _.extend(module, {
	  ItemSaleController: function(scope, resourceFactory, location,dateFilter,routeParams,webStorage,$rootScope) {
		  
		   scope.officeId = routeParams.officeId;
		   scope.officeName = webStorage.get("officeName");
		   scope.partnerId = 0;
		   if(routeParams.partnerId){
		   scope.partnerId = routeParams.partnerId;
		   }
		   scope.partnerName = webStorage.get("partnerName");
    	   scope.officeDatas = [];
    	   scope.itemDatas = [];
    	   scope.purchase = {};
    	   //scope.purchase.date = new Date();
    	   scope.formData={};
    	   scope.data={};
    	   scope.chargeDatas ={};
    	   
        resourceFactory.itemSaleTemplateResource.get(function(data) {
        	 scope.purchase.date = new Date(data.date);
        	 scope.officeDatas = data.officeDatas;
        	 scope.itemDatas = data.itemDatas;
        	 scope.chargeDatas = data.chargeDatas;
        	 for(var i in scope.officeDatas){
        		 if(scope.officeDatas[i].id == scope.officeId){
        			 scope.officeDatas.splice(i,1); 
        		 }
        	 }
        });
        
        scope.itemData=function(itemId){
        	
        	resourceFactory.oneTimeSaleTemplateResourceData.get({itemId: itemId}, function(data) {
        		delete scope.formData.quantity;
        		delete scope.formData.itemPrice;
        		scope.formData.itemId=itemId;
        		scope.formData.unitPrice = data.unitPrice;
	        });	
        };
        scope.itemDataQuantity=function(quantity,itemId){
        	delete scope.formData.itemPrice;
        	scope.data.unitPrice=scope.formData.unitPrice;
        	scope.data.locale=$rootScope.locale.code;
        	
        	scope.data.quantity=quantity;
        	resourceFactory.oneTimeSaleQuantityResource.get({quantity: quantity,itemId:itemId},scope.data, function(data) {
        		scope.formData.itemId=itemId;
        		scope.formData.chargeAmount = data.totalPrice;
	        });
        
        };
     
        scope.submit = function() {
        	
        	scope.formData.locale = $rootScope.locale.code;
           	var reqDate = dateFilter(scope.purchase.date,'dd MMMM yyyy');
            scope.formData.dateFormat = 'dd MMMM yyyy';
            scope.formData.purchaseDate = reqDate;
            if(scope.officeId !=0){
            scope.formData.purchaseBy= scope.officeId;
            }

            resourceFactory.itemSaleResource.save(scope.formData,function(data){

            	if(scope.officeId == 0){
            		location.path('/inventory');
            	}else if(scope.partnerId !=0){
            		location.path('/viewpartner/'+scope.partnerId+'/'+routeParams.officeId);		
            	}else{
            		location.path('/viewoffice/'+routeParams.officeId);		
            	}

          });
        };
        
        scope.partnersTab = function(){
       	   webStorage.add("callingTab", {someString: "Partners" });
        };
    }
  });
  mifosX.ng.application.controller('ItemSaleController', [
    '$scope', 
    'ResourceFactory', 
    '$location',
    'dateFilter',
    '$routeParams',
    'webStorage',
    '$rootScope', 
    mifosX.controllers.ItemSaleController]).run(function($log) {
    $log.info("ItemSaleController initialized");
  });
}(mifosX.controllers || {}));
