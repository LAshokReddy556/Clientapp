(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreatePlanMappingController: function(scope, resourceFactory, location,webStorage) {
        scope.planCodes = [];
        scope.statusDatas=[];
        scope.formData ={};
        
        resourceFactory.planMappingtemplateResource.getAllPlanMapping(function(data) {
        	scope.planCodes = data.planCodeData;
            scope.statusDatas=data.status;
        });
        scope.reset123 = function(){
	    	   webStorage.add("callingTab", {someString: "planMappingTab" });
	       };
        
        scope.submit = function() {
            resourceFactory.planMappingResource.save(scope.formData,function(data){
            		location.path('/mappingconfig');
          });
        };
    }
  });
  mifosX.ng.application.controller('CreatePlanMappingController', [
   '$scope', 
   'ResourceFactory', 
   '$location', 
   'webStorage',
    mifosX.controllers.CreatePlanMappingController]).run(function($log) {
    $log.info("CreatePlanMappingController initialized");
  });
}(mifosX.controllers || {}));
