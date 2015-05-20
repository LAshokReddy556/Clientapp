(function(module) {
  mifosX.controllers = _.extend(module, {
    EditItemController: function(scope, routeParams, resourceFactory, location,$rootScope,webStorage) {
        scope.itemClassDatas = [];
        scope.unitDatas = [];
        scope.chargesDatas = [];
        scope.formData = {};
        scope.removeItemPrices = [];
        scope.totalItem=routeParams.totalItem;
         resourceFactory.itemResource.get({itemId: routeParams.id} , function(data) {
        	scope.itemClassDatas = data.itemClassData;
            scope.unitDatas = data.unitData;
            scope.chargesDatas = data.chargesData;
            scope.formData=data;
            scope.regionDatas = data.regionDatas;
            scope.itemPrices = data.itemPricesDatas;
           

        });
         
         scope.reset123 = function(){
        	  webStorage.add("callingTab", {someString: "items" });
         };
        
         scope.addItemPrice = function () {
	           if (scope.itemPricesFormData.regionId && scope.itemPricesFormData.price) {
	        	   
	                scope.itemPrices.push({regionId:scope.itemPricesFormData.regionId, 
	                	price:scope.itemPricesFormData.price
	                });
	              
	                scope.itemPricesFormData.regionId = undefined;
	                scope.itemPricesFormData.price = undefined;
	                
	          	}
	     };
	     scope.removeItemPrice = function (index) {
	    	 console.log(index);
	    	 
	    	 scope.removeItemPrices.push({regionId:scope.itemPrices[index].regionId, 
          	   price:scope.itemPrices[index].price,locale:$rootScope.locale.code,id:scope.itemPrices[index].id});
           
	    	 scope.itemPrices.splice(index,1);
	     };
	     
        scope.submit = function() {	
        	 delete this.formData.id;
        	 delete this.formData.itemClassData;
        	 delete this.formData.unitData;
        	 delete this.formData.chargesData;
        	 delete this.formData.auditDetails;
        	 delete this.formData.regionDatas;
        	 delete this.formData.itemPricesDatas;
        	 
        	 //this.formData.unitPrice = "0";
        	 scope.formData.itemPrices =new Array();
        	 scope.formData.removeItemPrices = new Array();
        	 if(scope.removeItemPrices.length > 0){
        		 scope.formData.removeItemPrices = scope.removeItemPrices;
        	 }
        	 
        	 if (scope.itemPrices.length > 0) {
                 
                 for (var i in scope.itemPrices) {
                	
                   scope.formData.itemPrices.push({regionId:scope.itemPrices[i].regionId, 
                	   price:scope.itemPrices[i].price,locale:$rootScope.locale.code,id:scope.itemPrices[i].id});
                 };
              }
        	 this.formData.locale = $rootScope.locale.code;
               resourceFactory.itemResource.update({'itemId': routeParams.id},this.formData,function(data){
             location.path('/viewitem/' + data.resourceId +'/item/'+ scope.totalItem);

          });
        };
    }
  });
  mifosX.ng.application.controller('EditItemController', ['$scope', '$routeParams', 'ResourceFactory', '$location','$rootScope','webStorage', mifosX.controllers.EditItemController]).run(function($log) {
    $log.info("EditItemController initialized");
  });
}(mifosX.controllers || {}));
