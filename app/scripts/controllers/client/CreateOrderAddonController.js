(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateOrderAddonController: function(scope, routeParams , location,resourceFactory,webStorage,dateFilter ) {		
            scope.formData={};
            scope.subscriptiondatas=[];
            scope.addonsPriceDatas=[];
        	scope.addonServices=[];
            scope.serviceIds = [];
            var clientData = webStorage.get('clientData');
            scope.displayName=clientData.displayName;
            scope.statusActive=clientData.statusActive;
    	    scope.hwSerialNumber=clientData.hwSerialNumber;
            scope.accountNo=clientData.accountNo;
            scope.officeName=clientData.officeName;
            scope.balanceAmount=clientData.balanceAmount;
            scope.currency=clientData.currency;
            scope.imagePresent=clientData.imagePresent;
            scope.categoryType=clientData.categoryType;
            scope.email=clientData.email;
            scope.clientId=clientData.clientId;
            scope.phone=clientData.phone;
            if(scope.imagePresent){
             scope.image=clientData.image;
            }
            scope.orderData = webStorage.get('orderData');
            scope.orderId=webStorage.get('orderId');
            resourceFactory.orderaddonTemplateResource.get({planId : scope.orderData.planId,chargeCode :  scope.orderData.chargeCode} , function(data) {  
        	scope.subscriptiondatas=data.contractPeriods;
        	scope.addonsPriceDatas=data.addonsPriceDatas;
        	
        });
        
        scope.isSelected = function(id,isActive,price,index){
        
        	if(isActive =="Y"){
        		 scope.addonServices.push({
   				  "serviceId":id,
   				 "locale":"en",
   				  "price":price
   				 
   			  });
				
        	}else{
        		
        	   scope.addonServices.splice(index, 1);
        		/*scope.addonServices =  scope.addonServices.filter(function( obj ) {
        			return obj != id;
					});*/
			  }
			  
		  };
		  
		/*  scope.getvalues = function(id,contractId,price){
			  scope.addonServices.push({
				  "serviceId":id,
				  "contractId":contractId,
				  "price":price,
				  "locale":"en",
				  "dateFormat":"dd MMMM yyyy",
				  "startDate":dateFilter(new Date(),'dd MMMM yyyy')
			  });
		  };*/


        scope.submit = function() { 
        	
			/*  for(var i in scope.serviceIds){
				  alert($("#"+scope.serviceIds[i]).val());
				  scope.addonServices.push({
					  "serviceId":scope.serviceIds[i],
					  "price":$("#"+scope.serviceIds[i]).val(),
					  "locale":"en"
				  });
			  }*/
        	 this.formData.locale="en";
        	 this.formData.dateFormat="dd MMMM yyyy";
        	 this.formData.startDate=dateFilter(new Date(),'dd MMMM yyyy');
			 this.formData.addonServices=scope.addonServices;
			 this.formData.planName=scope.orderData.planName;
			 //scope.addonServices=[];
			 scope.serviceIds=[];
             resourceFactory.orderaddonResource.save({orderId: scope.orderId},this.formData,function(data){
           	 location.path('/vieworder/' +scope.orderId+'/'+scope.clientId);
             });
        };
    
    }
  });
  mifosX.ng.application.controller('CreateOrderAddonController', ['$scope', '$routeParams', '$location','ResourceFactory','webStorage',
                                                                  'dateFilter',mifosX.controllers.CreateOrderAddonController]).run(function($log) {
    $log.info("CreateOrderAddonController initialized");
  });
}(mifosX.controllers || {}));
