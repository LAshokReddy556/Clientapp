(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateServiceMappingController: function(scope, resourceFactory, location,webStorage) {
        scope.serviceCodes = [];
        scope.statusDatas=[];
        scope.serviceParameters=[];
        scope.provisionSysDatas = [];
        
        scope.configIPTV = webStorage.get("client_configuration").IPTV;
        resourceFactory.serviceMappingtemplateResource.getAllserviceMapping(function(data) {
           
        	scope.serviceCodes = data.serviceCodeData;
            scope.formData = data;
            scope.statusDatas=data.statusData;
            scope.serviceParameters=data.serviceParameters;
            scope.categories=data.categories;
            scope.subCategories=data.subCategories;
            scope.provisionSysDatas = data.provisionSysData;
            
            for(var i in scope.provisionSysDatas){
       		 if((scope.provisionSysDatas[i].mCodeValue).toLowerCase() == "none"){
       			 scope.formData.provisionSystem = scope.provisionSysDatas[i].mCodeValue;
       		 }
       	 }
        
        });
        
           scope.changeServiceType = function(serviceId){
        	   scope.serviceType;
        	for(var i in scope.serviceCodes){
        		
        		if(serviceId == scope.serviceCodes[i].id){
        			scope.serviceType=scope.serviceCodes[i].serviceType;
        		}
        	}

           };  
        scope.submit = function() {
        	
        	delete this.formData.serviceCodeData;
        	delete this.formData.statusData;
        	delete this.formData.serviceParameters;
        	delete this.formData.categories;
        	delete this.formData.provisionSysDatas;
        	delete this.formData.subCategories;
        	delete this.formData.provisionSysData;
        	
            resourceFactory.serviceMappingResource.save(scope.formData,function(data){
            		location.path('/mappingconfig');
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateServiceMappingController', [
    '$scope', 
    'ResourceFactory', 
    '$location', 
    'webStorage',
    mifosX.controllers.CreateServiceMappingController]).run(function($log) {
    $log.info("CreateServiceMappingController initialized");
  });
}(mifosX.controllers || {}));
