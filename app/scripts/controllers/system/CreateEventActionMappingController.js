(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateEventActionMappingController: function(scope, resourceFactory, location,webStorage) {
        scope.actionDatas = [];
        scope.eventDatas = [];
        resourceFactory.EventActionMappingTemplateResource.get(function(data) {
           
        	scope.actionDatas = data.actionData;
          //  scope.formData = data;
            scope.eventDatas = data.eventData;
        });
        
        scope.reset123 = function(){
        	webStorage.add("callingTab", {someString: "eventActionTab" }); 
        };
      
        scope.submit = function() {
            resourceFactory.EventActionMappingResource.save(this.formData, function(data){
            		location.path('/mappingconfig');
            });
        };
    }
  });
  mifosX.ng.application.controller('CreateEventActionMappingController', [
     '$scope', 
     'ResourceFactory', 
     '$location',
     'webStorage',
     mifosX.controllers.CreateEventActionMappingController
     ]).run(function($log) {
    	 $log.info("CreateEventActionMappingController initialized");
  });
}(mifosX.controllers || {}));