(function(module) {
  mifosX.controllers = _.extend(module, {
CreateServiceController: function(scope, resourceFactory, location) {
	  scope.formData = {};
	  scope.services = [];
      scope.statuses = [];
      
        resourceFactory.serviceTemplateResource.get(function(data) {
        	 scope.services= data.serviceTypes;
        	 scope.statuses= data.status;
        	 
        	 for(var i in scope.statuses){
        		 if((scope.statuses[i].value).toLowerCase() == "active"){
        			 scope.formData.status = scope.statuses[i].value;
        		 }
        	 }
             
        });
        
        scope.submit = function() {   
          resourceFactory.serviceResource.save(scope.formData,function(data){
        		  location.path('/services');
          });
        };
    }
  });
 mifosX.ng.application.controller('CreateServiceController', [
                                                              '$scope', 
                                                              'ResourceFactory', 
                                                              '$location', 
                                                              mifosX.controllers.CreateServiceController]).run(function($log) {
    $log.info("CreateServiceController initialized");
  });
}(mifosX.controllers || {}));
