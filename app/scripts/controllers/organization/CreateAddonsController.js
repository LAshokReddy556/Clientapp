(function(module) {
	mifosX.controllers = _.extend(module, {
		  CreateAddonsController: function(scope, resourceFactory, location,dateFilter,$rootScope) {
		  scope.serviceDatas = [];
		  scope.categoryDatas = [];
		  scope.chargeCodeDatas = [];
		  scope.priceRegionDatas =[];
		  scope.planDatas =[];
		  scope.gridView = true;
		  scope.noChannels = false;
		  scope.slides = [];
		  scope.serviceIds = [];
		  scope.addonServices = [];
		  scope.formData={};
		   

		  
		  resourceFactory.addonsTemplateResource.get(function(data) {
			  scope.serviceDatas = data.servicedatas;
			  scope.planDatas =data.planDatas;
			  scope.chargeCodeDatas = data.chargeCodeDatas;
			  scope.priceRegionDatas = data.priceRegionData;
			 
			  if(scope.serviceDatas.length==0){
				  scope.noChannels = true;
			  }
			  else{
				  scope.noChannels = false;
			  }
			  
			  for(var i in scope.serviceDatas){
				  if(scope.serviceDatas[i].category){
					  scope.categoryDatas.push({
					  							  'category':scope.serviceDatas[i].category,
							  					});
				  }
			  }
			  scope.categoryDatas =_.uniq(scope.categoryDatas,function(item,key,id){
		             return item.category;
		         });
		  });
		  scope.isSelected = function(id,isActive){

			  if(isActive =="Y"){
				  scope.serviceIds.push(id);
			  }else{
				  scope.serviceIds =  scope.serviceIds.filter(function( obj ) {
					    return obj != id;
					});
			  }
			  
		  };
		  scope.previousBtnFun = function(){
			  scope.gridView = true;
		  };
		  
		  scope.submit = function() {
			scope.addonServices=[];
			  for(var i in scope.serviceIds){
				  scope.addonServices.push({
					  "serviceId":scope.serviceIds[i],
					  "price":$("#"+scope.serviceIds[i]).val(),
					  "locale":"en"
				  });
			  }
			  this.formData.addons=scope.addonServices;
			  scope.addonServices=[];
			  resourceFactory.addonsResource.save(this.formData,function(data){
				  location.path('/addons');
        });
		  };
		  
    }
  });
  mifosX.ng.application.controller('CreateAddonsController', [
                                                            '$scope', 
                                                            'ResourceFactory', 
                                                            '$location',
                                                            'dateFilter',
                                                            '$rootScope', 
                                                             mifosX.controllers.CreateAddonsController]).run(function($log) {
                                                             $log.info("CreatePlanController initialized");
                                                           });
}(mifosX.controllers || {}));
